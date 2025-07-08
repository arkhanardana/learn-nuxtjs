export const useBaseUrl = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.apiBase;

  return {
    BASE_URL,
  };
};
