<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-10 py-4"
    :style="backgroundComputed"
  >
    <div class="container">
      <!-- eslint-disable -->
      <div class="ckeditor-custom" v-html="block.content" />
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`
      }
    : { backgroundColor: props.block.background_color }
);
</script>
