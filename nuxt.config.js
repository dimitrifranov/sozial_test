export default {
  mode: 'universal',
  // todo CHANGE
  debug: false,
  /*
   ** Headers of the page
   */
  head: {
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
    baseUrl: process.env.API_URL
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
            url: '/auth/login/',
            method: 'post',
            propertyName: 'key'
          },
          logout: {
            url: '/auth/logout/',
            method: 'post'
          },
          user: {
            url: '/auth/user/',
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
      appId: process.env.APP_KEY,
      safari_web_id: process.env.SAFARI_WEB_ID,
      allowLocalhostAsSecureOrigin: false,
      welcomeNotification: {
        disable: false
      }
    }
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'https://social-tests.herokuapp.com',
    apiUrl: process.env.API_URL
  },
  privateRuntimeConfig: {
    appKey: process.env.APP_KEY
  }
}
