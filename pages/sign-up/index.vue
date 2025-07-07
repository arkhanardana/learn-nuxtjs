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
        name: data.name,
        email: data.email,
        password: data.password,
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
  <div
    class="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
  >
    <div class="w-full max-w-md">
      <Card
        class="mx-auto w-full shadow-md border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
      >
        <CardHeader class="space-y-1 pb-6">
          <div class="flex justify-center mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
          </div>
          <CardTitle
            class="text-2xl text-center font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
          >
            Create Account
          </CardTitle>
          <CardDescription class="text-center text-slate-600 dark:text-slate-400">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
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
                class="cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
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
                  Create an account
                </span>
              </Button>
            </AutoForm>
          </div>

          <div class="text-center">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?
              <NuxtLink
                to="/sign-in"
                class="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 underline decoration-2 underline-offset-2 transition-colors duration-200"
              >
                Sign in
              </NuxtLink>
            </p>
          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p class="text-xs text-center text-slate-500 dark:text-slate-400">
              By creating an account, you agree to our
              <span class="text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >Terms of Service</span
              >
              and
              <span class="text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >Privacy Policy</span
              >
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
