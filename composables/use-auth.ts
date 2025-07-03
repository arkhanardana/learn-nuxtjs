export const useAuth = () => {
  const session = ref(false);
  const role = ref("admin");

  return { session, role };
};
