<script lang="ts" setup>
import { ref } from "vue";
import { toast } from "vue-sonner";
import { AutoForm } from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { postSchema, type PostValues } from "~/lib/schemas";

const isLoading = ref(false);
const schema = postSchema;

const onSubmit = async (data: PostValues) => {
  try {
    isLoading.value = true;

    await $fetch("https://jsonplaceholder.typicode.com/posts", {
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
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Post</CardTitle>
        </CardHeader>

        <CardContent>
          <AutoForm
            class="space-y-4"
            :schema="schema"
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
            <Button type="submit" :disabled="isLoading">
              <span v-if="isLoading">Submitting...</span>
              <span v-else>Submit</span>
            </Button>
          </AutoForm>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
