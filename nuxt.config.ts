// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@tresjs/nuxt', '@nuxt/eslint'],
  tres: {
    devtools: true,
    glsl: true
  }
})
