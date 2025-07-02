<script lang="ts" setup>
import { toast } from "vue-sonner";
import type { z } from "zod";
import { AutoForm } from "~/components/ui/auto-form";
import { Button } from "~/components/ui/button";
import { postSchema } from "~/lib/schemas";

type PostValues = z.infer<typeof postSchema>;
const isLoading = ref(false);

const schema = postSchema;

const onSubmit = async (data: PostValues) => {
  try {
    isLoading.value = true;
    await $fetch("", {
      method: "POST",
      body: data,
    });

    toast.success("Success to post");
  } catch (error) {
    toast.error("Error");
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="container mx-auto px-10">
    <div class="max-w-lg">
      <AutoForm
        class="w-2/3 space-y-3"
        :schema="schema"
        @submit="onSubmit"
        :field-config="{
          title: {
            label: 'Title',
            inputProps: {
              placeholder: 'Please input your title',
              type: 'text',
            },
          },
          body: {
            label: 'Content',
            inputProps: {
              placeholder: 'Please input your content',
              type: 'text',
            },
          },
        }"
      >
        <Button type="submit"> Submit </Button>
      </AutoForm>
    </div>
  </div>
</template>
