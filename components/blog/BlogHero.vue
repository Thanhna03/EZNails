<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <main>
    <div class="container py-6 text-text-blog">
      <NuxtLink v-if="isBackPageBlog" :to="routePathBlog()"
        class="flex w-fit justify-center items-center p-2 rounded-md hover:opacity-85 bg-main mb-5">
        <UIcon name="i-heroicons-arrow-left-16-solid" class="text-main-foreground" />
      </NuxtLink>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <BlogSearch class="mb-6 lg:hidden block " />
        <div class="flex flex-col justify-between lg:col-start-1 lg:col-end-3">
          <div v-if="isNoResult" class="mt-4 text-center opacity-65 text-3xl">
            No results found
          </div>
          <slot :data="pagePosts" />
          <div :class="!(isShowPagination) && 'flex-1'" class="mx-auto w-fit mt-6">
            <UPagination v-if="isShowPagination" v-model="pagination" size="lg" :max="7" :page-count="1"
              :total="totalPagination" :prev-button="{ to: handleOnClickPagination(pagination - 1) }"
              :next-button="{ to: handleOnClickPagination(pagination + 1) }" :to="(page: number) => ({
                query: { ...route.query, page }
              })" />
          </div>
        </div>
        <div class="lg:border-l lg:pl-4">
          <BlogSearch class="mb-10 lg:block hidden " />
          <BlogRecent class="mb-10" />
          <div class="sticky top-[15vh] h-fit">
            <BlogCategory class="mb-10" />
            <BlogTags />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
interface Props {
  itemsPerPage?: number
}

const { itemsPerPage } = defineProps<Props>()

const {
  isNoResult,
  pagePosts,
  totalPagination,
  handleOnClickPagination,
  route,
  isShowPagination,
  isBackPageBlog,
  routePathBlog,
  pagination,
  currentPage } = useBlogHero(itemsPerPage || 6);

</script>

<style lang="scss" scoped>
.bg-primary-500 {
  background-color: var(--color-secondary) !important;
}
</style>
