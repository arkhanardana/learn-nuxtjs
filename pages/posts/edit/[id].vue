<script setup lang="ts">
import { useRoute } from "vue-router";
import { postSchema, type PostValues } from "~/lib/schemas";
import { AutoForm } from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { toast } from "vue-sonner";
import { ref } from "vue";

const route = useRoute();
const id = route.params.id as string;

const isLoading = ref(false);

const { data: postData, pending } = await useFetch<PostValues>(
  `https://jsonplaceholder.typicode.com/posts/${id}`
);

const onSubmit = async (data: PostValues) => {
  try {
    isLoading.value = true;
    await $fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: data,
    });
    toast.success("Post updated successfully!");
  } catch (err) {
    toast.error("Failed to update post");
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-xl">
    <Card v-if="!pending">
      <CardHeader>
        <CardTitle>Edit Post #{{ id }}</CardTitle>
      </CardHeader>

      <CardContent>
        <AutoForm
          class="space-y-4"
          :schema="postSchema"
          :initial-values="postData"
          @submit="onSubmit"
          :field-config="{
            title: {
              label: 'Title',
              inputProps: { placeholder: 'Enter new title' },
            },
            body: {
              label: 'Content',
              inputProps: { placeholder: 'Edit content here' },
            },
          }"
        >
          <Button type="submit" :disabled="isLoading" class="cursor-pointer hover:bg-teal-500">
            <span v-if="isLoading">Updating...</span>
            <span v-else>Update</span>
          </Button>
        </AutoForm>
      </CardContent>
    </Card>

    <div v-else class="text-center py-10 text-gray-600">Loading post...</div>
  </div>
</template>
