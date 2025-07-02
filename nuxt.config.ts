import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  app: {
    pageTransition: { name: "page", mode: "in-out" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  modules: ["@nuxt/image", "shadcn-nuxt"],
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
