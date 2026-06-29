<template>
  <main>
    <template v-if="formattedPage">
      <component
        :is="block._block_name"
        v-for="(block, index) in formattedPage.content_blocks"
        :key="index"
        :block="block"
        :data-binding="`#content_blocks.${index}`"
      />
    </template>
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { useNewzenPage } from '~/composables/useNewzenPage';
const { page } = useContent();
const pageData = page.value;
const { formattedPage } = useNewzenPage(pageData)
</script>
