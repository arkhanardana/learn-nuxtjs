<script lang="ts" setup>
import type { Post } from "~/types/types";

const { posts } = defineProps<{
  posts: Post[];
}>();

const truncateText = (text: string, maxLength: number = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="post in posts"
      :key="post.id"
      class="group relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"
        ></div>
      </div>

      <div class="relative p-6 lg:p-7 h-full flex flex-col">
        <h2
          class="text-white text-xl lg:text-2xl font-bold mb-3 leading-tight group-hover:text-teal-50 transition-colors duration-200"
        >
          {{ post.title }}
        </h2>

        <p class="text-white/90 text-sm lg:text-base leading-relaxed mb-6 flex-grow">
          {{ truncateText(post.body) }}
        </p>

        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center gap-2 text-white/70 text-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Post #{{ post.id }}</span>
          </div>

          <NuxtLink :to="`/posts/${post.id}`">
            <div
              class="group/button inline-flex items-center gap-2 px-4 py-2.5 bg-white/95 hover:bg-white rounded-xl text-teal-600 hover:text-teal-700 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span>Read More</span>
              <svg
                class="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"
      ></div>
    </div>
  </div>
</template>
