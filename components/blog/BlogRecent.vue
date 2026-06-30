<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <h3 class="text-[#eaae05] text-lg font-bold mb-2">Recent posts</h3>
    <div class="relative w-full border !border-l-0 mb-7">
      <span class="absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5" />
    </div>
    <div>
      <div v-for="(item, index) in posts" :key="index">
        <NuxtLink v-if="posts.length > 0" :to="item._path">
          <div class="grid grid-cols-4 items-start mb-4">
            <div class="col-start-1 col-end-2">
              <img class="object-cover aspect-1" :src="item.thumb_img.image" :alt="item.thumb_img.image_alt">
            </div>
            <div class="ml-4 col-start-2 col-end-5">
              <h3 class="line-clamp-2 text-sm text-[#eaae05] font-bold">
                {{ item.title }}
              </h3>
              <div class="text-sm text-foreground font-medium ckeditor-custom line-clamp-2 my-2"
                v-html="item.desc" />
              <span class=" block text-sm text-foreground">{{ renderDatePost(item.date) }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogPageHelpers } from '~/composables/useBlogPage';

const { renderDatePost } = useBlogPageHelpers()

const blogStore = useBlogStore();

const posts = ref(blogStore.postsOriginal.slice(0, 4));

watch(
  () => blogStore.postsOriginal,
  (newValue) => {
    posts.value = newValue.slice(0, 4);
  },
  { immediate: true }
);
</script>
