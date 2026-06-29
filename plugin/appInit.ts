export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const languageStore = useLanguageStore();
  languageStore.initLanguage(route?.path || "/");
});
