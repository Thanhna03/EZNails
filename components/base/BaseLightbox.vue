<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <vue-easy-lightbox
    :move-disabled="true"
    :visible="visibleRef"
    :imgs="dataImage"
    :index="indexRef"
    @hide="onHide"
    @click="onPreNextClick"
  >
    <template #close-btn="{ close }">
      <button class="btn-close" @click="close">
        <UIcon name="i-mdi-close" class="text-[20px]" />
      </button>
    </template>
  </vue-easy-lightbox>
</template>

<script lang="ts" setup>
import VueEasyLightbox from 'vue-easy-lightbox';

interface Props {
  dataImage: any;
  indexCurrent: number;
  valueButton: HTMLElement
}
const props = defineProps<Props>();

const emit = defineEmits<{(e: 'close', id: number): void;}>();

const visibleRef = ref(false);
const indexRef = ref(-1);

watch(
  () => props.indexCurrent,
  (idx) => {
    if (props.indexCurrent !== -1) {
      visibleRef.value = true;
      indexRef.value = idx;
      onPreNextClick();
    } else {
      visibleRef.value = false;
    }
  }
);

const onPreNextClick = () => {
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector('.vel-img-wrapper');
      wrapper?.appendChild(props.valueButton);
    });
  }, 400);
};

const onHide = () => {
  visibleRef.value = false;
  emit('close', -1);
};
</script>
<style lang="scss" scoped>
.btn-close {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -15px;
  top: -15px;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 100%;
}
.vel-img-title{
  font-size: 15px !important;
  color: white !important;
  opacity: 1 !important;
  text-transform: capitalize !important;
  font-weight: bold !important;
}
</style>
