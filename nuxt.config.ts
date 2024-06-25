// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: [
  //   '@nuxtjs/dotenv'
  // ],
  // dotenv: {
  //   /* module options */
  // },
  devtools: { enabled: true },
  css: ['/assets/styles.css'],
  build: {
    transpile: ['gsap'],
  },
})
