export function useBlogCategory() {
  const blogStore = useBlogStore();
  const langStore = useLanguageStore();
  const postsOriginal = computed(() => blogStore.postsOriginal);
  const pathQuery = computed(() => langStore.getLocalizedUrl("/"));
  const categories: any = computed(() => blogStore.category);
  const route = useRoute();

  const isActive = (item: any) => {
    return route.path === routePathCategory(item);
  };

  const routePathCategory = (item: any) => {
    return `${pathQuery.value}blog/category${item._path}`;
  };

  const removeDuplicates = (array: any[]) => {
    if (array.length === 0) {
      return array;
    }
    return [
      ...new Map(
        array.map((item: any) => [item.text.toLowerCase().trimEnd(), item])
      ).values(),
    ];
  };

  const CountPostCategory = (item: string) => {
    const listPosts: any[] = [];
    let newArray: any;
    postsOriginal.value.forEach((post: any) => {
      if ("category" in post) {
        newArray = removeDuplicates(post?.category);
        newArray.forEach((value: any) => {
          if (
            typeof value?.text === "string" &&
            value?.text.toLowerCase().trimEnd() === item.toLowerCase().trimEnd()
          ) {
            listPosts.push(post);
          }
        });
      }
    });
    return listPosts.length;
  };

  return {
    CountPostCategory,
    routePathCategory,
    categories,
    isActive,
  };
}
