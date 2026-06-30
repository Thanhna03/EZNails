<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="w-full">
    <NuxtLink :to="data._path">
      <div class="item-post-blog">
        <div class="item-post-blog-background" />
        <img
          class="mb-3 w-full object-cover aspect-1"
          :src="data.thumb_img.image"
          :alt="data.thumb_img.image_alt"
        >
      </div>
    </NuxtLink>
    <div class="flex flex-col">
      <div class=" flex items-start">
        <div class="flex flex-col items-center justify-center border-2 text-center border-foreground text-foreground p-2 w-fit font-medium">
          <span>{{ renderDateMonth(data.date).date }}</span>
          <span>{{ renderDateMonth(data.date).month }}</span>
        </div>
        <div class="ml-2">
          <NuxtLink :to="data._path">
            <span class="mb-2 lg:text-lg line-clamp-2 text-secondary capitalize">
              {{ data.title }}
            </span>
          </NuxtLink>
          <div
            class="text-sm font-medium ckeditor-custom text-foreground line-clamp-2 mb-2"
            v-html="data.desc"
          />
          <div v-if="data?.category?.length === 1 && data?.category[0]?.text" class="block">
            <span class="mb-2 text-left text-sm ckeditor-custom">Posted in:
            </span>
            <NuxtLink v-for="post, i in renderCateOrTag(data, 'category')" :key="i" :to="post._path" :target="post?.open_new_tab ? '_blank': ''" class=" mr-1">
              <span class="hover:underline text-left text-sm ckeditor-custom">{{
                post.text }}</span>
            </NuxtLink>
          </div>
          <div v-else-if="data?.category?.length > 0" class="block">
            <span class="mb-2 text-left text-sm ckeditor-custom text-foreground">Posted in:
            </span>
            <NuxtLink v-for="post, i in renderCateOrTag(data, 'category')" :key="i" :to="post._path" :target="post?.open_new_tab ? '_blank': ''" class=" mr-1">
              <span class="hover:underline text-foreground text-left text-sm ckeditor-custom">{{
                post.text }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogPageHelpers } from '~/composables/useBlogPage';
interface Props {
  data: any
}
const { data } = defineProps<Props>()
const { renderDateMonth, renderCateOrTag } = useBlogPageHelpers()
</script>
<style lang="scss" scoped>
.item-post-blog {
  position: relative;
  .item-post-blog-background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  &:hover {
    .item-post-blog-background {
      opacity: 0.3;
    }
  }
}
</style>
