<script lang="ts" setup>
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const {
  data: posts,
  error,
  pending,
} = await useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");
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
  </div>
</template>
