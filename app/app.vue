<script setup lang="ts">
</script>

<template>
  <div class="scene-wrapper">
    <TresCanvas clear-color="#0a0e14" window-size>
      <TresPerspectiveCamera :position="[3, 2, 4]" :look-at="[0, 0, 0]" />
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight :position="[5, 5, 5]" :intensity="1.2" />

      <RampUpCube />
    </TresCanvas>
  </div>
</template>

<style scoped>
.scene-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
