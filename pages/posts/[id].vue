<script setup lang="ts">
import { useRoute } from "vue-router";
import { toast } from "vue-sonner";
import type { Post } from "~/types/types";
import { BASE_URL } from "~/lib/api";
import CardDetail from "~/components/card-detail.vue";

definePageMeta({
  layout: "dashboard",
});

const route = useRoute();
const postId = route.params.id;

useHead({
  title: `Post - ${postId}`,
});

const { data: post, error, pending } = await useFetch<Post>(`${BASE_URL}${postId}`);

const handleDelete = async (postId: string | string[]) => {
  try {
    await $fetch(`${BASE_URL}${postId}`, {
      method: "DELETE",
    });

    toast.success("Post deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error(`Error: ${error}`);
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <nav class="mb-8">
        <NuxtLink
          to="/posts"
          class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200 group"
        >
          <svg
            class="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Posts
        </NuxtLink>
      </nav>

      <div v-if="pending" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"
          ></div>
          <p class="text-slate-600 text-lg">Loading post...</p>
        </div>
      </div>

      <div v-else-if="error" class="flex items-center justify-center py-20">
        <div class="text-center">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h2>
          <p class="text-slate-600">Failed to load the post. Please try again later.</p>
        </div>
      </div>

      <CardDetail
        :post="post as Post"
        :postId="postId"
        :onDelete="() => post?.id && handleDelete(String(post.id))"
      />
    </div>
  </div>
</template>
