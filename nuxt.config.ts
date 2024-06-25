// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // modules: [
  //   '@nuxtjs/dotenv'
  // ],
  // dotenv: {
  //   /* module options */
  // },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
    },
  },
  plugins: [
    '~/plugins/axios'
  ],
  devtools: { enabled: true },
  css: ['/assets/styles.css'],
  build: {
    transpile: ['gsap'],
  },
})
