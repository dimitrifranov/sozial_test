export default {
  mode: 'universal',
  debug: process.env.DEBUG,
  /*
   ** Headers of the page
   */
  head: {
    meta: [
      {
        name: 'google-site-verification',
        content: 'kzW2KiVf07F2vPMD3NtNGgpxG3meyiLDb5zwjuKvKtQ'
      },
      { name: 'msvalidate.01', content: '1636892432B7A73367EC8F10284EFE52' }
    ],
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
    { src: '@/plugins/vuelidate', mode: 'client' },
    '~/plugins/axios'
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
    '@nuxtjs/auth',
    '@nuxtjs/google-gtag'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: process.env.API_URL,
    credentials: true
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
      name: 'Tschau - das sichere Soziale Netzwerk',
      short_name: 'Tschau',
      lang: 'de',
      background_color: '#121212',
      description:
        'Tschau.app ist ein sicheres soziales Netzwerk. Erstelle Gruppen mit deinen Freunden und teile tolle Bilder.',
      meta: {
        mobileAppIOS: true,
        theme_color: '#FFFFFF',
        lang: 'de',
        nativeUI: true,
        name: 'Tschau',
        author: 'Dimitri Franov',
        description:
          'Tschau.app ist ein sicheres soziales Netzwerk. Erstelle Gruppen mit deinen Freunden und teile tolle Bilder.'
      },
      shortcuts: [
        {
          name: 'Einen Beitrag Posten',
          short_name: 'Posten',
          description: 'Teile deine Bilder mit Freunden',
          url: '/post/',
          icons: [{ src: '/icon.png', sizes: '192x192' }]
        },
        {
          name: 'Eine Gruppe erstellen',
          short_name: 'Gruppe',
          description:
            'Erstelle eine neue Gruppe um Bilder nur mit deinen Freunden zu teilen.',
          url: '/groups/new/',
          icons: [{ src: '/icon.png', sizes: '192x192' }]
        }
      ]
    },
    workbox: {
      //   config: { debug: true },
      offlineAnalytics: true
      //   preCaching: ['/', '/index.html', '/users/me.html', '/notifications.html'],
      //   cacheOptions: {
      //     cacheId: '<npm package name> || nuxt',
      //     directoryIndex: '/',
      //     revision: null
      //   },
      //   offlinePage: 'offline.html'
    }
  },
  auth: {
    // plugins: ['~/plugins/auth.js'],
    cookie: {
      options: {
        secure: true
      }
    },
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
  'google-gtag': { id: 'UA-147350224-2' },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || 'https://tschau.app',
    apiUrl: process.env.API_URL
  },
  privateRuntimeConfig: {
    appKey: process.env.APP_KEY
  }
}
