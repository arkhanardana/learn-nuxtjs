import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    betterAuth: {
      secret: process.env.BETTER_AUTH_SECRET,
      url: process.env.BETTER_AUTH_URL,
    },

    database: process.env.DATABASE_URL,

    githubProvider: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },

    public: {
      apiBase: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  app: {
    head: {
      title: "Posts List",
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
        },
        {
          rel: "icon",
          href: "https://static.vecteezy.com/system/resources/previews/029/722/382/non_2x/notes-icon-in-trendy-flat-style-isolated-on-white-background-notes-silhouette-symbol-for-your-website-design-logo-app-ui-illustration-eps10-free-vector.jpg",
        },
      ],
    },
    pageTransition: { name: "page", mode: "in-out" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: ["@nuxt/image", "shadcn-nuxt", "@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/main.css"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
