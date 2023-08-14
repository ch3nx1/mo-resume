// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: { '/templates': { ssr: false } },
  nitro: {
    preset: 'github_pages'
  },
  modules: [
    '@nuxtjs/i18n',
    'nuxt-icons',
    'nuxt-quasar-ui',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs']
      }
    ]
  ],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  quasar: { lang: 'zh-CN' },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
