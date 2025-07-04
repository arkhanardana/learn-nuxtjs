<template>
  <div>
    <footer class="bg-teal-600 text-white py-4">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-lg font-semibold">© {{ new Date().getFullYear() }} MyPost</div>

        <div class="flex space-x-4">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <NuxtLink to="/" class="hover:underline">About</NuxtLink>
          <NuxtLink to="/" class="hover:underline">Contact</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>
