<script lang="ts" setup>
import { toast } from "vue-sonner";
import { signUp } from "~/lib/auth-client";

const email = ref("");
const password = ref("");
const name = ref("");

const router = useRouter();

const handleSignUp = async () => {
  if (!email.value || !password.value || !name.value) {
    toast.error("Please input those field");
    return;
  }
  try {
    await signUp.email(
      {
        email: email.value,
        password: password.value,
        name: name.value,
      },
      {
        onSuccess: () => {
          toast.success("Successfully to sign sign in");
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
            <div class="grid grid-cols-1 gap-4">
              <div class="grid gap-2">
                <Label for="name"> Name</Label>
                <Input id="name" placeholder="Input your name" required v-model="name" />
              </div>
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                v-model="email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="password" placeholder="******" />
            </div>
            <Button type="button" class="w-full" @click="handleSignUp"
              >Create an account</Button
            >
          </div>
          <div class="mt-4 text-center text-sm">
            Already have an account?
            <a href="/sign-in" class="underline"> Sign in </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style></style>
