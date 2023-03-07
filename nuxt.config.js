import colors from "vuetify/es5/util/colors";
import { ru } from "vuetify/src/locale";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Baital",
    title: "Baital",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
      },
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-icon-180x180.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-icon-192x192.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/manifest.json" },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "theme-color", content: "#ffffff" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/main.scss", "~/assets/custom.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/swiper", ssr: true },
    { src: "~/plugins/translate", ssr: true },
    { src: "~/plugins/ymaps", ssr: true },
    { src: "~/plugins/vmask", ssr: false },
    { src: "~/plugins/formatDate", ssr: true },
    { src: "~/plugins/formatPrice", ssr: true },
    { src: "~/plugins/snack", ssr: false },
    { src: "~/plugins/highcharts", ssr: false },
    { src: "~/plugins/role", ssr: true },
    { src: "~/plugins/infiniteloop", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
    "@aceforth/nuxt-optimized-images"
  ],
  optimizedImages: {
    optimizeImages: true
  },
  moment: {
    defaultLocale: "ru",
    locales: ["ru"]
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "@nuxtjs/google-analytics",
    "nuxt-seo",
    ["vue-scrollto/nuxt", { duration: 300, offset: -140 }]
  ],
  publicRuntimeConfig: {
    WS_API: process.env.WS_API || "ws://194.146.43.119/ws/"
  },
  // env: {
  //   WS_API: process.env.WS_API || "ws://194.146.43.119/ws/"
  // },
  axios: {
    baseURL: process.env.BASE_URL || "http://194.146.43.119/api/"
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    lang: {
      locales: { ru },
      current: "ru"
    },
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "ff7a29",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: "FF7A29",
          error: "DF4041",
          success: "52B059"
        }
      }
    }
  },

  auth: {
    redirect: {
      property: "/",
      logout: "/",
      login: "/",
      home: "/"
    },
    strategies: {
      local: {
        token: {
          property: "access",
          type: "Bearer",
          maxAge: 36000 * 24
        },
        user: {
          property: false
        },
        refreshToken: {
          property: "refresh",
          data: "refresh",
          maxAge: 15 * 24 * 60 * 60
        },
        endpoints: {
          login: {
            url: "auth/jwt/create/",
            method: "post"
          },
          user: {
            url: "auth/users/me/",
            method: "get"
          },
          logout: {
            property: false
          }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: "~/components/LoadingBar.vue"
};
