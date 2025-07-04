<script setup lang="ts">
import { Footer, Navbar } from "#components";
</script>

<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
