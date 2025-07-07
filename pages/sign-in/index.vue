<script setup lang="ts">
import { Github } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { signIn } from "~/lib/auth-client";
import { signInSchema, type SignInValues } from "~/lib/schemas";

definePageMeta({
  layout: "auth",
});

useHead({
  title: "Login Page",
});

const router = useRouter();
const isLoading = ref<boolean>(false);

const handleSignIn = async (data: SignInValues) => {
  try {
    isLoading.value = true;
    await signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Successfully to sign in");
          router.push({
            path: "/dashboard",
          });
        },
        onError(context) {
          console.log(context.error.message);
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
    <div class="w-full max-w-sm">
      <Card
        class="mx-auto w-full shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <CardTitle
            class="text-2xl text-center font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent"
          >
            Welcome Back
          </CardTitle>
          <CardDescription class="text-center text-slate-600 dark:text-slate-400">
            Enter your credentials below to sign in
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <div class="grid gap-4">
            <AutoForm
              class="space-y-4"
              :schema="signInSchema"
              @submit="handleSignIn"
              :field-config="{
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
                class="cursor-pointer bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 w-full shadow-lg hover:shadow-xl transition-all duration-200 transform"
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
                  Signing in...
                </span>
                <span v-else>Sign In</span>
              </Button>
            </AutoForm>

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-slate-200 dark:border-slate-700"></span>
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span
                  class="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400"
                >
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              class="w-full border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 group"
              @click="
                async () => {
                  await signIn.social({
                    provider: 'github',
                    callbackURL: '/posts',
                  });
                }
              "
            >
              <Github
                class="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200"
              />
              Sign In with Github
            </Button>
          </div>

          <div class="text-center">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?
              <NuxtLink
                to="/sign-up"
                class="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 underline decoration-2 underline-offset-2 transition-colors duration-200"
              >
                Sign up
              </NuxtLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
