export default defineNuxtPlugin((nuxtApp) => {
  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  nuxtApp.provide("format-date", {
    formatDate,
  });
});
