<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="lg:py-12 py-10"
  >
    <BaseLightbox
      :value-button="valueButton"
      :data-image="dataImage"
      :index-current="indexCurrent"
      @close="handleClose"
    />
    <div class="container">
      <h2 class="text-center lg:mb-9 mb-6 title-section">
        {{ block.title }}
      </h2>
      <div
        class="text-center mb-[50px] description-section ckeditor-custom max-w-[700px] mx-auto"
        v-html="block.description"
      />
      <div class="grid lg:grid-cols-[3fr_1fr] grid-cols-1 lg:gap-[10px] gap-8">
        <div class="lg:grid hidden lg:grid-cols-3 grid-cols-2 gap-[10px]">
          <div
            v-for="(item, index) in allDataGallery"
            :key="index"
            class="gallery__item"
            @click="onShow(index)"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.image_alt"
              class="aspect-1 image"
            />
            <p class="item__title font-bold uppercase">{{ item.image_alt }}</p>
          </div>
        </div>
        <div class="lg:hidden block">
          <swiper
            :modules="modules"
            :navigation="false"
            :space-between="10"
            :breakpoints="{
              '768': {
                slidesPerView: 2,
                spaceBetween: 10,
                slidesPerGroup: 1,
              }
            }"
          >
            <swiper-slide v-for="(item, index) in allDataGallery" :key="index">
              <div class="gallery__item" @click="onShow(index)">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.image_alt"
                  class="aspect-1 image"
                />
                <p class="item__title font-bold uppercase">
                  {{ item.image_alt }}
                </p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          v-if="settingData.business.list_item.length > 0"
          class="rounded-[25px] lg:pt-11 lg:px-5 p-5"
          :style="{ backgroundColor: block.extend.business.background_color }"
        >
          <div
            class="title-section text-2xl text-secondary text-start ckeditor-custom lg:mb-10 mb-6"
            v-html="block.extend.business.title"
          />
          <div
            v-for="(item, index) in settingData.business.list_item"
            :key="index"
            class="grid lg:grid-cols-[90px_1fr] grid-cols-[120px_1fr] lg:gap-[10px] gap-[5px] text-[14px] leading-5 mb-4"
          >
            <label class="text-start font-bold">{{ item.label }}</label>
            <p class="text-start">{{ item.content }}</p>
          </div>
        </div>
      </div>
      <div v-if="block.button.is_show" class="lg:mt-10 mt-6 text-center">
        <BaseButton
          :url="block.button.url"
          :is-target-blank="block.button.open_new_tab"
          :text="block.button.text"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import setting from "@/data/setting.json";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

const modules = [Navigation];

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();

const { sortFn } = useGalleryHelpers();
const galleryStore = useGalleryStore();
const languageStore = useLanguageStore();
const settingData = computed(() => languageStore.getLocalizedData(setting));

const DATA_PER_PAGE = 9;

const getGalleryItems = computed(() => {
  return galleryStore.getGalleryItems;
});

const allDataGallery = computed(() => {
  const galleryItems = getGalleryItems.value.slice(0, DATA_PER_PAGE) || [];
  return [...galleryItems].sort(sortFn(props.block.sort));
});

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`,
      }
    : { backgroundColor: props.block.background_color },
);

const dataImage = computed(() => {
  return allDataGallery.value?.length > 0
    ? allDataGallery.value?.map((item: any) => ({
        src: item.image,
        title: item.image_alt,
      }))
    : [];
});
const indexCurrent = ref(-1);
const valueButton = ref<any>();
const onShow = (idx: number) => {
  indexCurrent.value = idx;
  nextTick(() => {
    const eleIconClose = document.querySelector(".btn-close") as HTMLElement;
    eleIconClose.style.display = "none";
  });
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector(".vel-img-wrapper");
      const btnClose = document.querySelector(".btn-close") as HTMLElement;
      if (btnClose) {
        btnClose?.classList.add("btn-close");
        btnClose.style.display = "flex";
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

  img {
    transform: scale(1);
    transition: all 0.3s ease-out;
  }

  &::after {
    content: "";
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: linear-gradient(
      to bottom,
      var(--color-secondary),
      #000000
    );
    transition: opacity 0.3s ease-out;
    left: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s ease-out;
  }

  &:hover {
    &::after {
      opacity: 0.7;
    }

    img {
      transform: scale(1.4);
    }

    .item__title {
      opacity: 1;
    }
  }
}
</style>
