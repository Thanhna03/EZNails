<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="py-10"
  >
    <div class="container">
      <div
        class="lg:mt-[20px] flex flex-col items-center lg:gap-11 gap-10 lg:px-0 px-5"
        itemscope
        itemtype="http://schema.org/AboutPage"
      >
        <img
          v-if="block.extend.image_decoration" 
          :src="block.extend.image_decoration"
          :alt="block.image_alt"
          class="aspect-1 image max-w-[215px] max-h-[215px] mx-auto rounded-full rotating"
        >
        <div class="text-center">
          <div
            v-if="block.title"
            class="title-breadcrumb !font-secondary ckeditor-custom"
            v-html="block.title"
          />
          <div
            v-if="block.sub_title"
            itemprop="name"
            class="title-breadcrumb lg:text-[55px] text-[36px] ckeditor-custom"
            v-html="block.sub_title"
          />
        </div>
        <img
          v-if="block.image" 
          itemprop="image"
          :src="block.image"
          :alt="block.image_alt"
          class="image lg:aspect-[2/1] aspect-[3/2] rounded-[35px]" 
        >
        <div
          v-if="block.description"
          itemprop="description"
          class="text-[15px] leading-[30px] text-justify ckeditor-custom"
          v-html="block.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
<style lang="scss" scoped>
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 5s linear infinite;
  -moz-animation: rotating 5s linear infinite;
  -ms-animation: rotating 5s linear infinite;
  -o-animation: rotating 5s linear infinite;
  animation: rotating 5s linear infinite;
}
</style>
