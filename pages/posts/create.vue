<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { postSchema, type PostValues } from "~/lib/schemas";

definePageMeta({
  layout: "dashboard",
});

useHead({
  title: "Create Post Page",
});

const isLoading = ref<boolean>(false);
const { BASE_URL } = useBaseUrl();

const form = useForm<PostValues>();

const onSubmit = async (data: PostValues) => {
  try {
    isLoading.value = true;

    await $fetch(`${BASE_URL}/posts`, {
      method: "POST",
      body: data,
    });

    toast.success("Post created successfully!");
    form.resetForm({
      values: {
        title: "",
        content: "",
      },
    });
  } catch (error) {
    toast.error("Failed to create post.");
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full shadow-lg mb-4"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h1
            class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-2"
          >
            Create New Post
          </h1>
          <p class="text-slate-600 dark:text-slate-400">
            Share your thoughts and ideas with the world
          </p>
        </div>

        <!-- Form Card -->
        <Card class="shadow-md border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader class="pb-6">
            <CardTitle class="text-xl font-semibold text-slate-800 dark:text-slate-200">
              Post Details
            </CardTitle>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Fill in the information below to create your post
            </p>
          </CardHeader>

          <CardContent class="space-y-6">
            <AutoForm
              class="space-y-6"
              :form="form"
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
                content: {
                  label: 'Content',
                  inputProps: {
                    placeholder: 'Write your post content here',
                    type: 'text',
                  },
                },
              }"
            >
              <div class="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  :disabled="isLoading"
                  class="flex-1 cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <span v-if="isLoading" class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Post
                  </span>
                </Button>

                <Button
                  as-child
                  variant="outline"
                  class="flex-1 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200"
                >
                  <NuxtLink to="/posts" class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Posts
                  </NuxtLink>
                </Button>
              </div>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
