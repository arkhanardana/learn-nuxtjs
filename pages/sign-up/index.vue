<script lang="ts" setup>
import { toast } from "vue-sonner";
import { signUp } from "~/lib/auth-client";
import { signUpSchema, type SignUpValues } from "~/lib/schemas";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Sign Up Page",
});

const router = useRouter();
const isLoading = ref(false);

const handleSignUp = async (data: SignUpValues) => {
  try {
    isLoading.value = true;

    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          toast.success("Successfully to sign up");
          router.push({
            path: "/sign-in",
          });
        },
        onError: (context) => {
          toast.error(context.error.message);
        },
      }
    );
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="w-full max-w-md">
      <Card class="mx-auto w-full">
        <CardHeader>
          <CardTitle class="text-xl">Sign Up</CardTitle>
          <CardDescription> Enter your information to create an account </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <AutoForm
              class="space-y-4"
              :schema="signUpSchema"
              @submit="handleSignUp"
              :field-config="{
                name: {
                  label: 'Name',
                  inputProps: {
                    placeholder: 'John Doe',
                    type: 'text',
                  },
                },
                email: {
                  label: 'Email',
                  inputProps: {
                    placeholder: 'm@example.com',
                    type: 'email',
                  },
                },
                password: {
                  label: 'Password',
                  inputProps: {
                    placeholder: '*******',
                    type: 'password',
                  },
                },
              }"
            >
              <Button
                type="submit"
                :disabled="isLoading"
                class="cursor-pointer hover:bg-teal-500 w-full"
              >
                {{ isLoading ? "Creating..." : "Create an account" }}
              </Button>
            </AutoForm>
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <NuxtLink to="/sign-in" class="underline"> Sign in </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style></style>
