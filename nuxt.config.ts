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
      apiBase: "localhost:5000",
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  app: {
    head: {
      title: "Posts List",
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