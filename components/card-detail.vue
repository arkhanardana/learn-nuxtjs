<script lang="ts" setup>
import type { Post } from "~/types/types";
import { formatDate } from "~/lib/utils";

defineProps<{
  post: Post;
  postId: string | string[];
  onDelete: (postId: string | string[]) => void;
}>();
</script>

<template>
  <article class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="px-8 py-6 border-b border-slate-100">
      <div class="flex items-center gap-3 text-sm text-slate-500 mb-3">
        <span class="px-3 py-1 bg-teal-50 text-teal-600 rounded-full font-medium">
          Post #{{ postId }}
        </span>
        <span>•</span>
        <time>{{ formatDate(new Date().toLocaleDateString()) }}</time>
      </div>

      <h1 class="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
        {{ post.title }}
      </h1>
    </div>

    <div class="px-8 py-8">
      <div class="max-w-none">
        <p class="text-slate-700 leading-relaxed text-lg">
          {{ post.body }}
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
                <AlertDialogAction class="bg-red-600 hover:bg-red-500 cursor-pointer">
                  <p @click="onDelete(postId)">Delete</p>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div class="text-sm text-slate-500">User ID: {{ post.userId }}</div>
      </div>
    </div>
  </article>
</template>
