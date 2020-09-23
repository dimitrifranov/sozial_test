export default {
  mode: 'universal',
  // todo CHANGE
  debug: true,
  /*
   ** Headers of the page
   */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href:
          'https://fonts.googleapis.com/css2?family=Montserrat&family=Rubik:wght@300;400;500;700;900&display=swap'
      },
      {
        rel: 'preconnect',
        href: 'https://ma-project-files.s3.amazonaws.com'
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.jsdelivr.net'
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
    { src: '@/plugins/vue-infinite-scroll.js', ssr: false },
    { src: '@/plugins/vue-touch.js', ssr: false },
    { src: '@/plugins/vuelidate', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
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
      lang: 'de',
      background_color: '#121212',
      description: 'Das beste Soziale Netzwerk.',
      meta: {
        mobileAppIOS: true,
        theme_color: '#FFFFFF',
        lang: 'de',
        nativeUI: true
      },
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
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://social-tests.herokuapp.com'
  },
  privateRuntimeConfig: {
    appKey: process.env.APP_KEY,
    apiUrl: process.env.API_URL
  }
}
