<script setup lang="ts">
const { speed, altitude } = defineProps<{ speed: number; altitude: number }>()

// Display-only scale factors (flight.speed/altitude are scene units, not
// calibrated to real physics) so the HUD reads like a cockpit instrument.
const SPEED_DISPLAY_SCALE = 30
const ALTITUDE_DISPLAY_SCALE = 10

const displaySpeed = () => Math.round(speed * SPEED_DISPLAY_SCALE)
const displayAltitude = () => Math.round(Math.max(altitude, 0) * ALTITUDE_DISPLAY_SCALE)
</script>

<template>
  <div class="hud">
    <div class="hud__top">
      <div class="hud__indicator">
        <span class="hud__label">Speed</span>
        <span class="hud__value">{{ displaySpeed() }} km/h</span>
      </div>
      <div class="hud__indicator">
        <span class="hud__label">Altitude</span>
        <span class="hud__value">{{ displayAltitude() }} m</span>
      </div>
    </div>

    <div class="hud__bottom">
      <p class="hud__hint">
        ↑↓ Speed / Climb · ←→ Turn · Click plane for info
      </p>
    </div>
  </div>
</template>

<style scoped>
.hud {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hud__top {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
  color: var(--color-text);
  font-family: var(--font-mono);
  text-shadow: 0 0 0.625rem rgb(var(--color-accent-rgb) / 80%);
}

.hud__indicator {
  background: rgb(0 0 0 / 50%);
  padding: 0.9375rem 1.5625rem;
  border-radius: var(--radius-md);
  border: 1px solid rgb(var(--color-accent-rgb) / 30%);
}

.hud__label {
  display: block;
  font-size: 0.8rem;
  opacity: 0.7;
}

.hud__value {
  font-size: 1.5rem;
  font-weight: 700;
}

.hud__bottom {
  display: flex;
  justify-content: center;
  padding-bottom: 1.25rem;
}

.hud__hint {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  opacity: 0.6;
}
</style>
