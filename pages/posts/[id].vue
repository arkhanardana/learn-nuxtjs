<script setup lang="ts">
import { useRoute } from "vue-router";
import type { Post } from "./index.vue";

const route = useRoute();
const postId = route.params.id;
console.log(postId);

const {
  data: post,
  error,
  pending,
} = await useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
</script>

<template>
  <div class="container mx-auto px-6 py-8">
    <NuxtLink to="/posts" class="text-blue-500 hover:underline">← Back</NuxtLink>

    <div v-if="pending">Loading post...</div>
    <div v-else-if="error">Failed to load post.</div>
    <div v-else>
      <h1 class="text-4xl font-bold mb-4">{{ post?.title }}</h1>
      <p class="text-gray-700 text-lg">{{ post?.body }}</p>
    </div>
  </div>
</template>
