<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { toast } from "vue-sonner";
import type { Post } from "~/types/types";
import { BASE_URL } from "~/lib/api";

const route = useRoute();
const postId = route.params.id;

const { data: post, error, pending } = await useFetch<Post>(`${BASE_URL}${postId}`);

const handleDelete = async (postId: string | string[]) => {
  try {
    await $fetch(`${BASE_URL}${postId}`, {
      method: "DELETE",
    });

    toast.success("Post deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Error" + error);
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

      <article
        v-else
        class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
      >
        <!-- Header -->
        <div class="px-8 py-6 border-b border-slate-100">
          <div class="flex items-center gap-3 text-sm text-slate-500 mb-3">
            <span class="px-3 py-1 bg-teal-50 text-teal-600 rounded-full font-medium">
              Post #{{ postId }}
            </span>
            <span>•</span>
            <time>{{ new Date().toLocaleDateString() }}</time>
          </div>

          <h1 class="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            {{ post?.title }}
          </h1>
        </div>

        <!-- Content -->
        <div class="px-8 py-8">
          <div class="max-w-none">
            <p class="text-slate-700 leading-relaxed text-lg">
              {{ post?.body }}
            </p>
          </div>
        </div>

        <div class="px-8 py-6 bg-slate-50 border-t border-slate-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-around gap-x-3">
              <NuxtLink
                :to="`/posts/edit/${postId}`"
                class="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors"
              >
                <p class="text-black underline cursor-pointer">Edit Post</p>
              </NuxtLink>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button class="bg-red-600 hover:bg-red-500 cursor-pointer">Delete</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post and
                      remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction class="bg-red-600 hover:bg-red-500 cursor-pointer"
                      ><p @click="handleDelete(postId)">Delete</p></AlertDialogAction
                    >
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div class="text-sm text-slate-500">User ID: {{ post?.userId }}</div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped></style>
