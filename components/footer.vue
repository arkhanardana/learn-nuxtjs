<template>
  <div>
    <template>
      <footer class="bg-teal-600 text-white py-4">
        <div
          class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="text-lg font-semibold">© 2025 MyPost</div>

          <div class="flex space-x-4">
            <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
            <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script setup lang="ts"></script>
