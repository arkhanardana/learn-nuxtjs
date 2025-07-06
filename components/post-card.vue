<script lang="ts" setup>
import type { Post } from "~/types/types";

const { posts } = defineProps<{
  posts: Post[];
}>();
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
    <div
      v-for="post in posts"
      :key="post.id"
      class="px-7 py-6 bg-gradient-to-r from-teal-600 to-teal-400 rounded-2xl max-w-2xl"
    >
      <h1 class="text-white text-2xl font-bold">{{ post.title }}</h1>
      <p class="text-white/90 pb-2">{{ post.body }}</p>

      <NuxtLink :to="`/posts/${post.id}`">
        <div class="px-3 py-3 bg-gray-100 rounded-xl text-gray-600 text-sm w-fit">
          Read More
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
