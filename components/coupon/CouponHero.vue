<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="pt-12 pb-10"
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
        class="text-center md:mb-[50px] mb-6 description-section ckeditor-custom max-w-[700px] mx-auto"
        v-html="block.description"
      />
      <div class="grid lg:grid-cols-2 gap-4">
        <div
          v-for="(item, index) in activeCoupons"
          :key="couponKey(item, index)"
          class="cursor-pointer hover__coupon"
          @click="onShow(index)"
        >
          <img v-if="item.image" :src="item.image" :alt="item.image_alt" class="w-full h-auto aspect-1" />
        </div>
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
        background: `url(${props.block.background_image}) center / cover`,
      }
    : { backgroundColor: props.block.background_color },
);

// start filter coupon expired
const isMounted = ref(false);
const activeCoupons = computed(() => {
  if (!props.block.list_item) return [];
  if (!isMounted.value) return [];
  return props.block.list_item.filter((item: any) => checkTimeExpired(item.time_start, item.time_end));
});

const couponKey = (item: any, index: number) => {
  return `${item.image || ''}-${item.time_start || ''}-${item.time_end || ''}-${index}`;
};

const dataImage = computed(() => {
  return activeCoupons.value.map((e: any) => ({
    src: e.image,
    title: e.image_alt,
  }));
});

onMounted(() => {
  isMounted.value = true;
});
// end filter coupon expired

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
.hover__coupon {
  overflow: hidden;
  img {
    transition: 0.3s all;
    transform: scale(1);
  }
  &:hover {
    img {
      transform: scale(1.2);
    }
  }
}
</style>
