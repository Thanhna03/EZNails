<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="pb-8 pt-12"
  >
    <div class="container">
      <h2 class="text-center lg:mb-9 mb-6 title-section">
        {{ block.title }}
      </h2>
      <div
        class="text-center lg:mb-[50px] mb-[30px] description-section ckeditor-custom max-w-[700px] mx-auto"
        v-html="block.description"
      />
      <div
        class="lg:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 hidden gap-[30px]"
      >
        <div
          v-for="(item, index) in allPostsService"
          :key="index"
          class="cursor-pointer flex items-center flex-col box__service"
          itemscope
          itemtype="http://schema.org/Service"
        >
          <meta itemprop="serviceType" :content="item.title"/>
          <div
            itemprop="provider"
            itemscope
            :itemtype="businessTypeURL"
            hidden
          >
            <meta itemprop="name" :content="businessName" />
            <meta itemprop="url" :content="baseURL" />
          </div>
          <NuxtLink
            itemprop="url"
            :to="`${pathQuery}service/#${item.title.split(' ').join('')}`"
            :target="block.button.open_new_tab ? '_blank' : ''"
            class="thumb__hover w-full mb-6"
          >
            <img
              v-if="item.image"
              itemprop="image"
              :src="item.image"
              :alt="item.image_alt"
              class="aspect-1 w-full object-cover"
            />
          </NuxtLink>
          <NuxtLink
            :to="`${pathQuery}service/#${item.title.split(' ').join('')}`"
            class="text-lg text-black font-semibold thumb__hover__title line-clamp-2 text-center"
          > 
            <span itemprop="name">
            {{ item.title }}
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="lg:hidden block">
        <swiper
          :modules="modules"
          :navigation="false"
          :space-between="10"
          :breakpoints="{
            '390': {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
            '768': {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 10,
              slidesPerGroup: 1,
            },
          }"
        >
          <swiper-slide v-for="(item, index) in allPostsService" :key="index">
            <div
              class="cursor-pointer flex items-center flex-col box__service transition-transform duration-300 hover:scale-x-150"
            >
              <NuxtLink
                :to="`${pathQuery}service/#${item.title.split(' ').join('')}`"
                :target="block.button.open_new_tab ? '_blank' : ''"
                class="thumb__hover w-full mb-3"
              >
                <img
                  :src="item.image"
                  :alt="item.image_alt"
                  class="aspect-1 w-full object-cover"
                />
              </NuxtLink>
              <NuxtLink
                :to="`${pathQuery}service/#${item.title.split(' ').join('')}`"
                class="text-lg text-black font-semibold thumb__hover__title line-clamp-2 text-center"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
          </swiper-slide>
        </swiper>
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
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
const modules = [Navigation];
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const languageStore = useLanguageStore();
const servicesStore = useServicesStore();
const { businessTypeURL, businessName, baseURL } = useService();
const pathQuery = computed(() => languageStore.getLocalizedUrl("/"));

const allPostsService = computed(() => {
  return servicesStore.getServicesItems;
});

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`,
      }
    : { backgroundColor: props.block.background_color },
);
</script>

<style lang="scss" scoped>
.box__service {
  transition: all 0.3s ease-in-out;
  .thumb__hover__title {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    transform: scale(1.18);
    .thumb__hover__title {
      color: var(--color-secondary);
    }
    .thumb__hover {
      &::before {
        -webkit-animation: shine 1.2s;
        animation: shine 1.2s;
      }
    }
  }
  .thumb__hover {
    display: block;
    position: relative;
    border-radius: 22px;
    overflow: hidden;
    transition: all 0.3s ease-out;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      z-index: 2;
      display: block;
      width: 50%;
      height: 100%;
      background: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 100%
      );
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 100%
      );
      -webkit-transform: skewX(-25deg);
      transform: skewX(-25deg);
    }
    &:hover {
      &::before {
        -webkit-animation: shine 1.2s;
        animation: shine 1.2s;
      }
    }
  }
}
@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>
