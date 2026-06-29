<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="pb-[80px] pt-[60px]"
  >
    <BaseLightbox
      :value-button="valueButton"
      :data-image="dataImage"
      :index-current="indexCurrent"
      @close="handleClose"
    />
    <div class="container">
      <div class="flex justify-center flex-wrap sm:gap-[15px] gap-2 mb-4">
        <BaseButton
          :active="idTab == 'all'"
          tab-item
          text="All"
          class="!w-full sm:!w-fit"
          @click="handleTab('all')"
        />
        <BaseButton
          v-for="(item, index) in block.gallery"
          :key="index"
          :active="idTab == index"
          tab-item
          :text="item.label"
          class="!w-full sm:!w-fit"
          @click="handleTab(index)"
        />
      </div>
      <div class="relative">
        <div v-if="isLoading" class="absolute top-0 left-0 w-full h-full bg-[#000000] opacity-50 z-10" />
        <BasePagination :items="getListAlbum" v-model="perPage" :perPage="SIZE_PER_PAGE">
          <template #default="{ items }">
            <div class="grid lg:grid-cols-4 grid-cols-2 gap-[10px] lg:mb-14 mb-8">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="gallery__item"
                @click="onShow(index)"
              >
                <img
                  :src="item.image"
                  :alt="item.image_alt"
                  class="aspect-1 image"
                >
                <p class="item__title text-2xl font-bold uppercase">{{ item.image_alt }}</p>
              </div>
            </div>
          </template>
        </BasePagination>
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
const { sortFn } = useGalleryHelpers();
const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`
      }
    : { backgroundColor: props.block.background_color }
);

// Load more
const idTab = ref<string | number>('all');
const SIZE_PER_PAGE:number = 16;
const perPage = ref<number>(1);
const isLoading = ref<boolean>(false);
const handleTab = (id: string | number) => {
  if(idTab.value === id) return
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
  idTab.value = id;
  perPage.value = 1;
};

const customData = () => {
  let data:any[]
  if (idTab.value === 'all') {
    const galleryItems = props.block.gallery.map((e: any) => e.item).flat().filter((e: any) => e !== null);
    data = [...galleryItems].sort(sortFn(props.block.sort));
  } else {
    const galleryItems = props.block.gallery.map((e: any) => e.item)[idTab.value] ? props.block.gallery.map((e: any) => e.item)[idTab.value] : null
    data = [...galleryItems].sort(sortFn(props.block.sort));
  }
  return data
};

const getListAlbum = computed(() => {
  return customData() ?? [];
});

// Light box
const dataImage = computed(() => {
  const start = (perPage.value - 1) * SIZE_PER_PAGE
  const end = start + SIZE_PER_PAGE
  return getListAlbum.value?.map((e: any) => ({
    src: e.image,
    title: e.image_alt
  })).slice(start, end) ?? [];
})

const indexCurrent = ref(-1);
const valueButton = ref<any>();
const onShow = (idx: number) => {
  indexCurrent.value = idx;
  nextTick(() => {
    const eleIconClose = document.querySelector('.btn-close') as HTMLElement;
    if(eleIconClose){
      eleIconClose.style.display = 'none';
    }
  });
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector('.vel-img-wrapper');
      const btnClose = document.querySelector('.btn-close') as HTMLElement;
      if (btnClose) {
        btnClose.classList.add('btn-close');
        btnClose.style.display = 'flex';
      } 
      wrapper?.appendChild(btnClose);
      valueButton.value = btnClose;
    });
  }, 400);
};

const handleClose = (id: number) => {
  indexCurrent.value = id;
};
</script>
<style lang="scss" scoped>
.gallery__item {
  cursor: pointer;
  overflow: hidden;
  position: relative;
  .item__title {
    pointer-events: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    color: var(--color-secondary-foreground);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
  img{
    transform: scale(1);
    transition: all 0.3s ease-out;
  }
  &::after {
    content: '';
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: linear-gradient(to bottom, var(--color-secondary), #000000);
    transition: opacity 0.3s ease-out;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s ease-out;
  }
  &:hover {
    &::after {
      opacity: 0.7
    }
    img{
      transform: scale(1.4);
    }
    .item__title{
      opacity: 1;
    }
  }
}
</style>
