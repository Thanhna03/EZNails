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
      <div class="lg:grid hidden lg:grid-cols-3 grid-cols-2 gap-[10px]">
        <div
          v-for="(item, index) in allDataCoupon"
          :key="couponKey(item, index)"
          class="gallery__item"
          @click="onShow(index)"
        >
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.image_alt"
            class="image aspect-1"
          />
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
          <swiper-slide
            v-for="(item, index) in allDataCoupon"
            :key="couponKey(item, index)"
          >
            <div class="gallery__item" @click="onShow(index)">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.image_alt"
                class="image aspect-1"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div v-if="block.button.is_show" class="lg:mt-10 mt-6 text-center">
      <BaseButton
        :url="block.button.url"
        :is-target-blank="block.button.open_new_tab"
        :text="block.button.text"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();
const modules = [Navigation];

const couponStore = useCouponStore();

const DATA_PER_PAGE = 9;

// start filter coupon expired
const isMounted = ref(false);
const allDataCoupon = computed(() => {
  const sourceCoupons = couponStore.getCouponItems || [];
  if (!isMounted.value) {
    return [];
  }
  return sourceCoupons
    .filter((item: any) => checkTimeExpired(item.time_start, item.time_end))
    .slice(0, DATA_PER_PAGE);
});

const couponKey = (item: any, index: number) => {
  return `${item.image || ""}-${item.time_start || ""}-${item.time_end || ""}-${index}`;
};

onMounted(() => {
  isMounted.value = true;
});
// end filter coupon expired

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`,
      }
    : { backgroundColor: props.block.background_color },
);

const dataImage = computed(() => {
  return allDataCoupon.value?.length > 0
    ? allDataCoupon.value?.map((item: any) => ({
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

  img {
    transform: scale(1);
    transition: all 0.3s ease-out;
  }

  &:hover {
    img {
      transform: scale(1.4);
    }
  }
}
</style>
