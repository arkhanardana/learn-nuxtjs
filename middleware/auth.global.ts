import { authClient } from "~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);

  if (!session.value) {
    if (to.path.startsWith("/dashboard")) {
      return navigateTo("/sign-in");
    }

    if (to.path.startsWith("/posts")) {
      return navigateTo("/sign-in");
    }
  } else {
    if (to.path.startsWith("/sign-in")) {
      return navigateTo("/dashboard");
    }
    if (to.path.startsWith("/sign-up")) {
      return navigateTo("/dashboard");
    }
  }
});
