<script setup lang="ts">
import { Github } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { signIn } from "~/lib/auth-client";
import { signInSchema, type SignInValues } from "~/lib/schemas";

definePageMeta({
  layout: "auth",
});

const router = useRouter();
const isLoading = ref(false);

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
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="w-full max-w-sm">
      <Card class="mx-auto w-full">
        <CardHeader>
          <CardTitle class="text-2xl"> Login </CardTitle>
          <CardDescription> Enter your credentials below to sign in </CardDescription>
        </CardHeader>
        <CardContent>
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
                class="cursor-pointer hover:bg-teal-500 w-full"
              >
                {{ isLoading ? "Signing in..." : "Sign In" }}
              </Button>
            </AutoForm>
            <Button
              variant="outline"
              class="w-full"
              @click="
                async () => {
                  await signIn.social({
                    provider: 'github',
                    callbackURL: '/posts',
                  });
                }
              "
            >
              <Github />
              Sign In with Github
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <NuxtLink to="/sign-up" class="underline"> Sign up </NuxtLink>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
