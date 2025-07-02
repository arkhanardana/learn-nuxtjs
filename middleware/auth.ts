export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = ref(false);
  if (!isAuthenticated.value) {
    return navigateTo("/hai");
  }
});
