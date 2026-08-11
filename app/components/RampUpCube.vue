<script setup lang="ts">
import { ShaderMaterial, DoubleSide, type Mesh } from 'three'
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import rampupVert from '../shaders/rampup.vert.glsl'
import rampupFrag from '../shaders/rampup.frag.glsl'

const cubeRef = shallowRef<Mesh | null>(null)

const material = new ShaderMaterial({
  vertexShader: rampupVert,
  fragmentShader: rampupFrag,
  uniforms: {
    uTime: { value: 0 }
  },
  side: DoubleSide
})

const { onBeforeRender } = useLoop()

// NOTE: the callback param is `elapsed`, not `elapsedTime` — TresJS v5 `useLoop` API.
onBeforeRender(({ delta, elapsed }) => {
  material.uniforms.uTime.value = elapsed

  if (cubeRef.value) {
    cubeRef.value.rotation.x += delta * 0.6
    cubeRef.value.rotation.y += delta * 0.9
  }
})
</script>

<template>
  <TresMesh ref="cubeRef" :material="material">
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
  </TresMesh>
</template>
