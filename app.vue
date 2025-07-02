<script setup lang="ts">
import Navbar from "./components/navbar.vue";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster />
  <NuxtLayout>
    <Navbar />
    <NuxtPage />
  </NuxtLayout>
</template>
