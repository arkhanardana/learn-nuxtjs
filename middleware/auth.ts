export default defineNuxtRouteMiddleware(() => {
  const { session, role } = useAuth();
  if (!session.value || role.value !== "admin") {
    return navigateTo("/posts");
  }
});
