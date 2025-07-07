<script setup lang="ts"></script>
<template>
  <div>
    <footer class="bg-teal-600 text-white py-4">
      <div
        class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="text-lg font-semibold">© {{ new Date().getFullYear() }} MyPost</div>

        <div class="flex space-x-4">
          <NuxtLink to="/" class="hover:underline" active-class="font-semibold">Home</NuxtLink>
          <NuxtLink to="/posts" class="hover:underline" active-class="font-semibold"
            >Posts</NuxtLink
          >
          <NuxtLink to="/dashboard" class="hover:underline" active-class="font-semibold"
            >Dashboard</NuxtLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>
