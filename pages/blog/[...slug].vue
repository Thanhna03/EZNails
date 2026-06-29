<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <main>
    <template
      v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
      <component :is="formattedPage.content_blocks[0]._block_name" :block="formattedPage.content_blocks[0]"
        :data-binding="`#content_blocks.0`" />
    </template>
    <div :style="backgroundComputed">
      <BlogHero v-slot="{ data }">
        <div class="py-4 relative">
          <div class="w-full flex flex-col jus items-center">
            <div class="flex flex-col gap-2.5">
              <div class=" flex items-start py-3">
                <div class="flex flex-col items-center justify-center border-2 text-center border-main p-2 w-fit font-medium">
                  <span>{{ renderDateMonth(pageData.date)?.date }}</span>
                  <span>{{ renderDateMonth(pageData.date)?.month }}</span>
                </div>
                <div class=" ml-2">
                  <h2 class="text-lg leading-normal text-start font-bold">{{ pageData.title }}</h2>
                  <div class="block text-text-blog-secondary">
                    <span class="mb-2 text-left text-lg ">Posted in: </span>
                    <NuxtLink v-for="item, i in renderCateOrTag(pageData, 'category')" :key="i"
                      :target="item?.open_new_tab ? '_blank' : ''" :to="item._path" class=" mr-1">
                      <span class="mb-2 hover:underline text-left text-lg">{{ item.text }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <div class="flex font-khand items-center gap-2 md:text-base text-sm md:leading-[2] leading-[1]">
                <NuxtLink v-if="pageData.author.text" :to="pageData.author.url"
                  class="transition-all text-base font-bold duration-300 hover:text-gray-500">
                  {{ pageData.author.text }}
                </NuxtLink>
                <span v-if="pageData.author.text" class="separator">•</span>
                <div v-if="renderDatePost(pageData.date)" class=" flex justify-center items-center gap-2">
                  <span class=" block text-base font-semibold text-text-blog-secondary">{{ renderDatePost(pageData.date) }}</span>
                </div>
              </div>
              <div class="text-start py-4 text-text-blog-secondary font-medium italic text-sm ckeditor-custom"
                v-html="pageData.desc" />
              <div class="text-lg leading-normal ckeditor-custom" v-html="pageData.content" />
            </div>
          </div>
        </div>
        <div v-if="'tags' in formattedPage && formattedPage?.tags?.length > 0">
          <div class=" relative w-full border">
            <span class="absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5"></span>
          </div>
          <div class=" flex justify-start pt-8 items-center gap-3">
            <h3 class="text-main text-lg font-bold">Tags</h3>
            <div class="flex gap-2 justify-start items-center flex-wrap">
              <div v-for="(item, i) in renderCateOrTag(pageData, 'tags')" :key="i"
                class="cursor-pointer rounded bg-main hover:opacity-80 transition-all duration-300 py-2 px-4 w-fit">
                <NuxtLink :to="item._path" :target="item?.open_new_tab ? '_blank' : ''">
                  <span class="select-none text-main-foreground">{{ item.text }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-if="activeRelatedPost" class="grid w-full pt-8 gap-5 md:grid-cols-3">
            <BlogCard v-for="(item, index) in postsRelate" :key="index" :data="item" />
          </div>
        </div>
      </BlogHero>
      <template
        v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component :is="block._block_name" v-for="(block, index) in formattedPage.content_blocks?.slice(1)" :key="index"
          :block="block" :data-binding="`#content_blocks.${index + 1}`" />
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useNewzenPage } from '~/composables/useNewzenPage';
import { useBlogPageHelpers, useFetchBlogContent } from '~/composables/useBlogPage';

const {
  renderDateMonth,
  renderCateOrTag,
  renderDatePost
} = useBlogPageHelpers();
const { contentBlog } = await useFetchBlogContent();
const { page } = useContent();
const blogStore = useBlogStore();

const posts = computed(() => blogStore.postsOriginal);
const pageData = page.value;

const formattedPage = computed(() => {
  return useNewzenPage(pageData?.publish && pageData)?.formattedPage?.value
})

const activeRelatedPost = computed(() => contentBlog.value?.related_post || false);

const postsRelate = computed(() => {
  const tagsPost = formattedPage.value?.tags
  const filterTags = tagsPost.map((tag: any) => tag.text);
  const filteredData = posts.value.filter((item: any) =>
    item.tags?.some((tag: any) => filterTags.includes(tag.text) && item._path !== formattedPage.value._path)
  );

  function getRandomItems(arr: any[], count: number) {
    if (!Array.isArray(arr) || arr.length < 3) {
      return arr || [];
    }
    const result = new Set();
    while (result.size < count) {
      result.add(arr[Math.floor(Math.random() * arr.length)]);
    }
    return Array.from(result);
  }

  return getRandomItems(filteredData, 3);
})

const backgroundComputed = computed(() =>
  contentBlog.value?.background_image
    ? { background: `url(${contentBlog.value.background_image}) center / cover` }
    : { backgroundColor: contentBlog.value?.background_color || 'unset' }
);
</script>

<style lang="scss"></style>
