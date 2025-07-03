import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);
  console.log(session.value);
  if (!session.value) {
    if (to.path === "/dashboard" || to.path === "/dashboard/") {
      return navigateTo("/sign-in");
    }
  } else {
    if (to.path === "/sign-in") {
      return navigateTo("/dashboard");
    }
    if (to.path === "/sign-up") {
      return navigateTo("/dashboard");
    }
  }
});
