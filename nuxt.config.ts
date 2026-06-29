// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  imports: {
    dirs: ['stores']
  },
  generate: {
    routes: ['']
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: false,
      routes: ['/sitemap.xml']
    },
    hooks: {
      'prerender:done': (result) => {
        result.failedRoutes.forEach((value, index) => {
          if (value.error) {
            console.warn(`Skipping 404 (Document not found) for route: ${value.error?.statusMessage}`);
            if (value.error?.statusCode === 404 && value.error?.statusMessage === 'Document not found!') {
              console.warn(`Skipping 404 (Document not found) for route: ${value.fileName}`);
              result.prerenderedRoutes[index].skip = true
              return
            }
            if (value.error?.statusCode === 500 && value.route === '/blog/') {
              console.warn(`Skipping 500 error for /blog/ ${value.fileName}`);
              result.prerenderedRoutes[index].skip = true
              return
            }
            result.prerenderedRoutes[index].skip = false
            console.error(`Error detected on route ${result.prerenderedRoutes[index].route}:`, value.error);
            throw value.error;
          }
        })
      }
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, minimum-scale=1',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  plugins: [
    '@/plugin/appInit.ts'
  ],
  css: ['@/assets/style/main.scss'],
  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-swiper',
    'nuxt-rating',
    '@pinia/nuxt'
  ],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classPrefix: '',
    storageKey: 'nuxt-color-mode'
  },
  tailwindcss: {
    cssPath: '@/assets/style/tailwind.css'
  },
  content: {
    documentDriven: true,
    highlight: {
      theme: 'light-plus'
    }
  },
  components: {
    global: true,
    dirs: ['~/components', '~/plugin', '~/composables']
  },
  ui: {
    icons: ['mdi']
  },
  build: {
    transpile: ['newzen-connector']
  }
});
