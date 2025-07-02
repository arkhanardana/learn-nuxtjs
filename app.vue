<script setup lang="ts">
import Navbar from "./components/navbar.vue";
import { Toaster } from "./components/ui/sonner";
</script>

<template>
  <Toaster />
  <NuxtLayout>
    <header>
      <Navbar />
    </header>
    <NuxtPage />
  </NuxtLayout>
</template>
