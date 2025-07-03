<script setup lang="ts">
import Footer from "./components/footer.vue";
import Navbar from "./components/navbar.vue";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster />
  <NuxtLayout>
    <Navbar />
    <NuxtPage />
    <NuxtLoadingIndicator />
    <Footer />
  </NuxtLayout>
</template>
