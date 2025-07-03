<script lang="ts" setup>
import { signOut, useSession } from "~/lib/auth-client";
const router = useRouter();

definePageMeta({
  layout: "dashboard",
});

const { data: session, error } = await useSession(useFetch);
</script>
<template>
  <div class="min-h-screen flex justify-center items-center p-4">
    <div class="w-full max-w-md">
      <Card class="mx-auto w-full">
        <CardHeader>
          <CardTitle class="text-2xl">Dashboard</CardTitle>
          <CardDescription>Welcome back! {{ session?.user.name }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div v-if="session" class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <NuxtImg
                  :src="session.user.image ?? undefined"
                  alt="Profile"
                  width="400"
                  height="400"
                  class="rounded-lg"
                />
              </div>
              <div>
                <h3 class="font-semibold text-lg">{{ session.user.name }}</h3>
                <p class="text-sm text-gray-600">{{ session.user.email }}</p>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="grid gap-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">Status</span>
                  <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full"
                    >Active</span
                  >
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium">Account Type</span>
                  <span class="text-sm text-gray-600">User</span>
                </div>
              </div>
            </div>

            <div class="pt-4">
              <Button
                @click="
                  async () => {
                    await signOut();
                    router.push('/posts');
                  }
                "
                variant="outline"
                class="w-full"
              >
                Logout
              </Button>
            </div>
          </div>

          <div v-else-if="error" class="text-center py-8">
            <div
              class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Terjadi kesalahan</h3>
            <p class="text-sm text-gray-600 mb-4">Gagal memuat informasi sesi</p>
            <Button variant="outline" size="sm"> Coba lagi </Button>
          </div>

          <div v-else>Gagal memuat konten.</div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
