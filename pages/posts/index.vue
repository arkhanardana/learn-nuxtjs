<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "List Posts",
});

import PostCard from "~/components/post-card.vue";
import { BASE_URL } from "~/lib/api";
import type { Post } from "~/types/types";

const { data: posts, error, pending } = await useFetch<Post[]>(`${BASE_URL}`);
</script>

<template>
  <div class="container mx-auto px-10 py-4">
    <div class="flex justify-between items-center">
      <h1 class="text-teal-500 text-2xl lg:text-6xl py-4 font-bold">Posts List</h1>

      <NuxtLink to="/posts/create">
        <div class="lg:px-4 lg:py-3 px-3 py-2 bg-teal-500 rounded-2xl text-white">
          Create Post
        </div>
      </NuxtLink>
    </div>

    <h1 v-if="error">Terjadi kesalahan saat fetching API</h1>
    <h1 v-if="pending">Loading....</h1>

    <h1 v-if="posts?.length === 0">Data not found.</h1>

    <PostCard :posts="posts ?? []" />
  </div>
</template>
