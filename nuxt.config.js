require('dotenv').config()
export default {
  mode: 'universal',
  debug: true,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=Rubik:wght@300;400;500;700;900&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/vue-material-icons', mode: 'client' },
    { src: '@/plugins/vue-advanced-cropper', mode: 'client' },
    '@plugins/global.js',
    { src: '~plugins/vue-infinite-scroll.js', ssr: false },
    { src: '@/plugins/vuelidate', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: 'https://social-tests-api.herokuapp.com/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  // router: {
  //   middleware: ['auth']
  // },
  pwa: {
    manifest: {
      name: 'Sozial.io - social in school',
      short_name: 'Sozial.io',
      start_url: '..',
      display: 'standalone',
      lang: 'German',
      background_color: '#121212',
      description: 'Das beste Soziale Netzwerk.',
      // icons: [
      //   {
      //     src: '/android-chrome-192x192.png',
      //     sizes: '192x192',
      //     type: 'image/png'
      //   },
      //   {
      //     src: '/android-chrome-512x512.png',
      //     sizes: '512x512',
      //     type: 'image/png'
      //   }
      // ],
      shortcuts: [
        {
          name: 'Einen Beitrag Posten',
          short_name: 'Posten',
          description: 'Teile deine Bilder mit Freunden',
          url: '/post/',
          icons: [{ src: '/icon.png', sizes: '192x192' }]
        }
      ]
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'https://social-tests-api.herokuapp.com/auth/login/',
            method: 'post',
            propertyName: 'key'
          },
          logout: {
            url: 'https://social-tests-api.herokuapp.com/auth/logout/',
            method: 'post'
          },
          user: {
            url: 'https://social-tests-api.herokuapp.com/auth/user/',
            method: 'get',
            propertyName: false
          }
        },
        // tokenRequired: true,
        tokenType: 'Token'
        // autoFetchUser: true
      }
    }
  },
  oneSignal: {
    init: {
      appId: '56c16a44-f980-41c2-8a74-b4591cc6ab35',
      safari_web_id: 'web.onesignal.auto.48d9c6a2-4943-4221-b17b-a4e235bf1c7d',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    }
  }
}
