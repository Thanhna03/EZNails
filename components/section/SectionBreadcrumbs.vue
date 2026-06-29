<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <section v-if="props.block.status" :data-cms-bind="dataBinding">
    <div class="section__breadcrumb py-12">
      <div
        class="bg-breadcrumb"
        :style="{
          backgroundImage: `linear-gradient(90deg, rgba(30, 33, 49, 0.9) 0%, rgba(38, 46, 80, 0) 100%), url('${props.block.background_image}')`,
        }"
      />
      <div class="container">
        <div
          class="title-breadcrumb text-center text-white ckeditor-custom"
          v-html="block.title"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.section__breadcrumb {
  position: relative;
  z-index: 5;
  .bg-breadcrumb {
    pointer-events: none;
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat, no-repeat;
    background-size: 100% 100%;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .section__breadcrumb {
    .bg-breadcrumb {
      background-size: cover;
    }
  }
}
</style>
