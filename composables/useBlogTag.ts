export function useBlogTag() {
  const blogStore = useBlogStore();
  const langStore = useLanguageStore();
  const pathQuery = computed(() => langStore.getLocalizedUrl("/"));
  const tags: any = computed(() => blogStore.tags);
  const route = useRoute();

  const routePathTag = (item: any) => {
    return `${pathQuery.value}blog/tags${item._path}`;
  };

  const isActive = (item: any) => {
    return route.path === routePathTag(item);
  };

  return {
    routePathTag,
    tags,
    isActive,
  };
}
