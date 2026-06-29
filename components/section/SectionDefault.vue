<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-10 py-4"
    :style="backgroundComputed"
  >
    <div class="container">
      <div v-if="block.title" class="ckeditor-custom" v-html="block.title" />
      <div v-if="block.sub_title" class="ckeditor-custom" v-html="block.sub_title" />
      <div v-if="block.sub_description" class="ckeditor-custom" v-html="block.sub_description" />
      <div v-if="block.description" class="ckeditor-custom" v-html="block.description" />
      <img v-if="block.image" :src="block.image" :alt="block.image_alt" />
      <div v-if="block.button.is_show" class="mt-4"> 
        <BaseButton
          :url="block.button.url"
          :is-target-blank="block.button.open_new_tab"
          :text="block.button.text"
        />
      </div>
      <div v-if="block.list_item" class="list-item">
        <div v-for="(item, index) in block.list_item" :key="index" class="item">
          <div v-if="item.title" class="title" v-html="item.title" />
          <div v-if="item.description" class="description" v-html="item.description" />
          <img v-if="item.image" :src="item.image" :alt="item.image_alt" />
        </div>
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
const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`
      }
    : { backgroundColor: props.block.background_color }
);
</script>
