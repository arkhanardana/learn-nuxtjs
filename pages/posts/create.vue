<script lang="ts" setup>
import { toast } from "vue-sonner";
import { BASE_URL } from "~/lib/api";
import { postSchema, type PostValues } from "~/lib/schemas";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Create Post Page",
});

const isLoading = ref(false);

const onSubmit = async (data: PostValues) => {
  try {
    isLoading.value = true;

    await $fetch(`${BASE_URL}`, {
      method: "POST",
      body: data,
    });

    toast.success("Post created successfully!");
  } catch (error) {
    toast.error("Something went wrong.");
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 h-screen">
    <div class="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>

        <CardContent>
          <AutoForm
            class="space-y-4"
            :schema="postSchema"
            @submit="onSubmit"
            :field-config="{
              title: {
                label: 'Title',
                inputProps: {
                  placeholder: 'Enter your post title',
                  type: 'text',
                },
              },
              body: {
                label: 'Content',
                inputProps: {
                  placeholder: 'Write your post content here',
                  type: 'text',
                },
              },
            }"
          >
            <Button
              type="submit"
              :disabled="isLoading"
              class="cursor-pointer hover:bg-teal-500"
            >
              {{ isLoading ? "Creating..." : "Create" }}
            </Button>
            <Button as-child variant="outline" class="ml-3">
              <NuxtLink to="/posts"> Back </NuxtLink>
            </Button>
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
