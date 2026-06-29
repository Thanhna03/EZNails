import LangSettings from "@/data/lang-setting.json";

export function useBlogHero(itemsPerPage: number) {
  const { convertToSlug } = useBlogPageHelpers();
  const langStore = useLanguageStore();
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
  const existPath = (route: any) => {
    return excludedRoutesName.value.includes(String(route.name));
  };

  const languageStore = useLanguageStore();
  const route = useRoute();
  const blogStore = useBlogStore();

  const filterPostsByTitle = (allPosts: any, searchTitle: string) => {
    const value = searchTitle.toLowerCase().replace(/\s+/g, "");
    return allPosts.filter((post: any) =>
      post.title.toLowerCase().replace(/\s+/g, "").includes(value)
    );
  };

  const handleSetPostsRecentBySearch = (posts: any, searchTitle?: string) => {
    if (searchTitle) {
      blogStore.setPostsRecent(filterPostsByTitle(posts, searchTitle));
    } else {
      blogStore.setPostsRecent(posts);
    }
  };

  // const posts: any = ref(blogStore.postsRecent);
  const posts: any = computed(() => {
    if (route.query.search) {
      handleSetPostsRecentBySearch(blogStore.postsOriginal, String(route.query.search) || '');
    } else {
      handleSetPostsRecentBySearch(blogStore.postsOriginal);
    }
    const posts = blogStore.postsRecent;
    return filterPostsByTagOrCategory(posts, itemsPerPage);
  });
  
  const pagination = ref<number>(1);
  const currentPage = ref<number>(1);

  const isShowPagination = computed(() => {
    return posts.value?.length > itemsPerPage && route.name !== 'blog-slug';;
  });

  const totalPagination = computed(() => {
    return Math.ceil(posts.value?.length / itemsPerPage);
  });

  const pathQuery = computed(() => languageStore.getLocalizedUrl("/"));

  const pagePosts = computed(() => {
    return posts.value.slice(
      (currentPage.value - 1) * itemsPerPage,
      currentPage.value * itemsPerPage
    );
  });

  const isNoResult = computed(() => {
    return pagePosts.value?.length === 0 && existPath(route);
  });

  const isBackPageBlog = computed(() => {
    return route.path !== `${pathQuery.value}blog`;
  });

  const routePathBlog = () => {
    return `${pathQuery.value}blog`;
  };

  const handleOnClickPagination = (pagination: number) => {
    return {
      path: route.path,
      query: { ...route.query, page: pagination },
    };
  };

  const removeDuplicates = (array: any[]) => {
    return array.filter(
      (item, index, self) =>
        typeof item.text === "string" &&
        index ===
          self.findIndex(
            (t) => t?.text?.toLowerCase() === item.text.toLowerCase()
          )
    );
  };

  function FilterPostsByRouteSlug(list: any, key: any) {
    const listFilter: any[] = [];
    let newArray: any[] = [];

    list.forEach((item: any) => {
      if (key in item && Array.isArray(item[key]) && item[key].length > 0) {
        newArray = removeDuplicates(item[key]);
        newArray.forEach((value: any) => {
          if (
            typeof value.text === "string" &&
            convertToSlug(value.text) === route?.params?.slug[0].toString()
          ) {
            listFilter.push(item);
          }
        });
      }
    });
    return listFilter;
  }

  const filterPostsByTagOrCategory = (posts: any, itemsPerPage: number) => {
    let listFilter: any[] = [];
    if (route.path.includes(`${pathQuery.value}blog/tags`)) {
      listFilter = FilterPostsByRouteSlug(posts, "tags");
    } else if (route.path.includes(`${pathQuery.value}blog/category`)) {
      listFilter = FilterPostsByRouteSlug(posts, "category");
    } else {
      listFilter = posts;
    }
    blogStore.setTotalPaginationPosts(listFilter.length, itemsPerPage);
    return listFilter;
  };

  watch(
    () => route.query.page,
    (page) => {
      const p = Number(page);
      currentPage.value = isNaN(p) || p < 1 ? 1 : p;
      pagination.value = currentPage.value;
    },
    { immediate: true }
  );
  return {
    isNoResult,
    pagePosts,
    totalPagination,
    handleOnClickPagination,
    isBackPageBlog,
    routePathBlog,
    isShowPagination,
    pagination,
    currentPage,
    route,
  };
}
