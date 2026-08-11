<script setup lang="ts">
import { ref } from 'vue'
import { flight } from './composables/useFlightControls'

const showInfo = ref(false)
</script>

<template>
  <div class="scene-wrapper">
    <TresCanvas clear-color="#0a0e14" window-size>
      <TresPerspectiveCamera :position="[0, 6, 20]" :look-at="[0, 0, 0]" />
      <TresAmbientLight :intensity="0.6" />
      <TresDirectionalLight :position="[5, 8, 5]" :intensity="1.4" />
      <TresGridHelper :args="[1000, 50]" />

      <AircraftViewer :paused="showInfo" @select="showInfo = true" />
    </TresCanvas>

    <HUD :speed="flight.speed" :altitude="flight.altitude" />
    <InfoModal :visible="showInfo" @close="showInfo = false" />
  </div>
</template>

<style scoped>
.scene-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
