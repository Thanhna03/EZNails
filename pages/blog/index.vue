<template>
  <main>
    <div :style="backgroundComputed">
      <template
        v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component :is="formattedPage.content_blocks[0]._block_name" :block="formattedPage.content_blocks[0]"
          :data-binding="`#content_blocks`" />
      </template>
      <BlogHero :items-per-page="itemsPerPage" v-slot="{ data }">
        <div class="grid w-full gap-5 md:grid-cols-2">
          <BlogCard v-for="item, index in data" :key="index" :data="item" />
        </div>
      </BlogHero>
      <template
        v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component :is="block._block_name" v-for="(block, index) in formattedPage.content_blocks?.slice(1)" :key="index"
          :block="block" :data-binding="`#content_blocks.${index}`" />
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useNewzenPage } from '~/composables/useNewzenPage';

const { page } = useContent();
const pageData = page.value;

const { formattedPage } = useNewzenPage(pageData)

const itemsPerPage = computed(() => {
  if (!formattedPage.value?.items_per_page || formattedPage.value?.items_per_page <= 1) return 6
  return formattedPage.value?.items_per_page
})

const backgroundComputed = computed(() =>
  formattedPage.value?.background_image
    ? {
      background: `url(${formattedPage.value?.background_image}) center / cover` || 'unset'
    }
    : { backgroundColor: formattedPage.value?.background_color || 'unset' }
);

</script>
<style lang="scss" scoped></style>
