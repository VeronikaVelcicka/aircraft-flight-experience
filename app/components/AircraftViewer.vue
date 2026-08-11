<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import { useLoop, useTresContext } from '@tresjs/core'
import { shallowRef, watch } from 'vue'
import { Vector3, type Group } from 'three'
import type { TresPointerEvent } from '@tresjs/core'
import { useFlightControls } from '../composables/useFlightControls'

const { paused = false } = defineProps<{ paused?: boolean }>()
const emit = defineEmits<{ select: [] }>()

const { state } = useGLTF('/models/airplane.glb')
const aircraftRef = shallowRef<Group | null>(null)

watch(state, (gltf) => {
  aircraftRef.value = gltf?.scene ?? null
})

const { flight, update } = useFlightControls()
const { camera } = useTresContext()
const { onBeforeRender } = useLoop()

const forward = new Vector3()
const camOffset = new Vector3()
const desiredCamPos = new Vector3()

onBeforeRender(({ delta }) => {
  // Freeze the whole simulation (physics + camera) while a modal has focus,
  // so the aircraft doesn't keep flying/climbing behind the info panel.
  if (paused) return

  update(delta)

  const aircraft = aircraftRef.value
  if (!aircraft) return

  aircraft.rotation.x += (flight.targetPitch - aircraft.rotation.x) * delta * 2
  aircraft.rotation.z += (flight.targetRoll - aircraft.rotation.z) * delta * 2
  aircraft.rotation.y += (flight.targetYaw - aircraft.rotation.y) * delta * 2

  forward.set(0, 0, -1).applyQuaternion(aircraft.quaternion)
  aircraft.position.addScaledVector(forward, flight.speed * delta)
  flight.altitude = aircraft.position.y

  const activeCamera = camera.activeCamera.value
  if (activeCamera) {
    // Aircraft wingspan/length are ~11/9 units (glTF authored ~1 unit = 1 m,
    // matching a real Cessna 172's dimensions), so the chase camera needs to
    // sit well outside that footprint to frame the whole model.
    camOffset.set(0, 6, 20).applyQuaternion(aircraft.quaternion)
    desiredCamPos.copy(aircraft.position).add(camOffset)
    activeCamera.position.lerp(desiredCamPos, delta * 3)
    activeCamera.lookAt(aircraft.position)
  }
})

function onClick(event: TresPointerEvent) {
  event.stopPropagation()
  emit('select')
}
</script>

<template>
  <primitive v-if="state" :object="state.scene" @click="onClick" />
</template>
