import LangSettings from "@/data/lang-setting.json";

export function useBlogSearch() {

  const blogStore = useBlogStore();
  const langStore = useLanguageStore();
  const pathQuery = computed(() => langStore.getLocalizedUrl("/"));
  const keyLangCurrent = computed(() => langStore.keyLangCurrent);
  const defaultLang = LangSettings.find((l) => l.isDefault)?.value || "en";

  const excludedRoutesName = computed(() => {
    if (keyLangCurrent.value === defaultLang) {
      return ["blog-category-slug", "blog-tags-slug", "blog"];
    } else {
      return [
        `${keyLangCurrent.value}-blog-category-slug`,
        `${keyLangCurrent.value}-blog-tags-slug`,
        `${keyLangCurrent.value}-blog`,
      ];
    }
  });

  const posts = computed(() => blogStore.postsOriginal);
  const searchValue = ref(blogStore.title);

  const existPath = (route: any) => {
    return excludedRoutesName.value.includes(String(route.name));
  };

  const route = useRoute();
  const router = useRouter();

  const handlePushQuery = (value: string, path = route.path) => {
    const searchTitle = value?.toLowerCase()?.replace(/\s+/g, "");
    const page = route.query.page ? 1 : undefined;
    router.push({ path, query: { page, search: searchTitle } });
  };

  const handleSearch = () => {
    if (searchValue.value === "" && existPath(route)) {
      blogStore.setSearchBlog("");
      blogStore.setPostsRecent(blogStore.postsOriginal);
      if (route.query.search) {
        const newQuery = { ...route.query };
        delete newQuery.search;
        navigateTo({ path: route.path, query: newQuery });
      }
      return;
    }
    handlePushQuery(searchValue.value);
    if (searchValue.value !== "" && !existPath(route)) {
      navigateTo(`${pathQuery.value}blog`);
      handlePushQuery(searchValue.value, `${pathQuery.value}blog`);
    }
    blogStore.setSearchBlog(searchValue.value);
  };

  watch(
    () => route.query.search,
    (searchTitle: any) => {
      searchValue.value = searchTitle;
    },
    { immediate: true }
  );

  watch(
    () => route?.params?.slug,
    () => {
      if (!existPath(route)) {
        blogStore.setSearchBlog("");
        searchValue.value = "";
      }
    },
    { immediate: true }
  );

  return {
    handleSearch,
    searchValue,
    posts,
  };
}
