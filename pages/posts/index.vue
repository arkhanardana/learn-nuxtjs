<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "List Posts",
});

import PostCard from "~/components/post-card.vue";
import type { Post } from "~/types/types";

const { BASE_URL } = useBaseUrl();

const {
  data: posts,
  error,
  pending,
} = await useFetch<Post[]>(`${BASE_URL}/posts`, {
  server: false,
});
</script>

<template>
  <div class="container mx-auto px-6 lg:px-10 py-9">
    <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
      <div class="space-y-2">
        <h1
          class="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 dark:from-teal-400 dark:to-teal-300 bg-clip-text text-transparent"
        >
          Posts List
        </h1>
        <p class="text-slate-600 dark:text-slate-400 text-sm lg:text-base">
          Discover and manage your posts
        </p>
      </div>

      <NuxtLink to="/posts/create">
        <div
          class="group inline-flex items-center gap-2 px-4 py-3 lg:px-6 lg:py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <svg
            class="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Post
        </div>
      </NuxtLink>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center py-16 space-y-4">
      <div class="relative">
        <div
          class="w-12 h-12 border-4 border-teal-200 dark:border-teal-700 rounded-full animate-spin"
        ></div>
        <div
          class="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"
        ></div>
      </div>
      <p class="text-teal-600 dark:text-teal-400 font-medium">Loading posts...</p>
    </div>

    <div v-else-if="error" class="flex flex-col items-center justify-center py-16 space-y-4">
      <div
        class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <div class="text-center">
        <h3 class="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Oops! Something went wrong
        </h3>
        <p class="text-slate-600 dark:text-slate-400">
          There was an error fetching the posts. Please try again.
        </p>
      </div>
    </div>

    <div
      v-else-if="posts?.length === 0"
      class="flex flex-col items-center justify-center py-16 space-y-6"
    >
      <div
        class="w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/20 dark:to-teal-800/20 rounded-full flex items-center justify-center"
      >
        <svg
          class="w-12 h-12 text-teal-500 dark:text-teal-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <div class="text-center">
        <h3 class="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
          No posts yet
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">
          Get started by creating your first blog post
        </p>
        <NuxtLink to="/posts/create">
          <div
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Your First Post
          </div>
        </NuxtLink>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>{{ posts?.length }} {{ posts?.length === 1 ? "post" : "posts" }} found</span>
      </div>

      <PostCard :posts="posts ?? []" />
    </div>
  </div>
</template>
