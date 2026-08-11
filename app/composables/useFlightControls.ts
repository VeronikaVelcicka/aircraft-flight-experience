import { onMounted, onUnmounted, reactive } from 'vue'

export interface FlightState {
  speed: number
  altitude: number
  targetPitch: number
  targetRoll: number
  targetYaw: number
}

const MAX_SPEED = 10
const SPEED_STEP = 0.5
const PITCH_ANGLE = 0.15
const ROLL_ANGLE = 0.4
const YAW_RATE = 0.6

// Singleton: this scene has exactly one aircraft, so its flight state lives
// here rather than being prop-drilled between the 3D scene (AircraftViewer)
// and the HUD, which sit in different parts of the component tree.
//
// `flight`/`keys` are flat, primitive-only objects mutated every frame by
// the render loop — `reactive()`'s Proxy overhead is negligible here, and
// `shallowReactive` wouldn't change anything for this shape (it only skips
// proxying *nested* objects). If this pattern is ever reused for many
// instances at once (e.g. per-cloud state), switch to plain refs updated
// outside Vue's reactivity and synced to the UI on a throttled interval
// instead of every frame.
export const flight = reactive<FlightState>({
  speed: 0,
  altitude: 0,
  targetPitch: 0,
  targetRoll: 0,
  targetYaw: 0
})

const keys = reactive({ up: false, down: false, left: false, right: false })

function onKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp': keys.up = true; break
    case 'ArrowDown': keys.down = true; break
    case 'ArrowLeft': keys.left = true; break
    case 'ArrowRight': keys.right = true; break
  }
}

function onKeyup(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp': keys.up = false; break
    case 'ArrowDown': keys.down = false; break
    case 'ArrowLeft': keys.left = false; break
    case 'ArrowRight': keys.right = false; break
  }
}

/**
 * Wires up arrow-key listeners and returns an `update(delta)` function that
 * advances the shared `flight` state. Call once, from the component that
 * owns the render loop (AircraftViewer) — other components can just read
 * the exported `flight` ref directly (e.g. the HUD).
 */
export function useFlightControls() {
  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('keyup', onKeyup)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('keyup', onKeyup)
  })

  function update(delta: number) {
    if (keys.up) flight.speed = Math.min(flight.speed + SPEED_STEP, MAX_SPEED)
    else if (keys.down) flight.speed = Math.max(flight.speed - SPEED_STEP, 0)

    // Positive rotation.x tilts the nose up (forward = (0,0,-1) gains +Y),
    // so ArrowUp climbs and ArrowDown descends.
    flight.targetPitch = keys.up ? PITCH_ANGLE : keys.down ? -PITCH_ANGLE : 0
    flight.targetRoll = keys.left ? ROLL_ANGLE : keys.right ? -ROLL_ANGLE : 0

    if (keys.left) flight.targetYaw += YAW_RATE * delta
    if (keys.right) flight.targetYaw -= YAW_RATE * delta
  }

  return { flight, update }
}
