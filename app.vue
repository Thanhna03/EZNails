<template>
  <div class="min-h-screen ">
    <NuxtLayout>
      <div>
        <NuxtLoadingIndicator />
        <NuxtPage />
        <UNotifications />
        <template v-if="pluginData">
          <component
            :is="block._block_name"
            v-for="(block, index) in pluginData.content_blocks"
            :key="index"
            :block="block"
          />
        </template>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import plugin from '~/plugin/plugin_system_data.json';
const pluginData = computed<any>(() => plugin || {});
const galleryStore = useGalleryStore();
const languageStore = useLanguageStore();
const servicesStore = useServicesStore();
const blogStore = useBlogStore();
const couponStore = useCouponStore();

async function fetchPosts() {
  const pathQuery = languageStore.getLocalizedUrl('/');
  const { data: blog } = await useAsyncData(
    `dataBlog-${languageStore.keyLangCurrent}`,
    async () => {
      return await queryContent(`${pathQuery}blog`)
        .where({
          _path: { $ne: `${pathQuery}blog` },
          publish: { $ne: false },
        })
        .only(['title', 'thumb_img', 'date_published', 'date', '_path', 'tags', 'desc', 'category'])
        .sort({ createdAt: -1, date: -1 })
        .find()
    })
  blogStore.setPostsOriginal(deepCopy(blog.value || []))
  blogStore.setPostsRecent(deepCopy(blog.value || []))
}

async function fetchGalleryItems() {
  const pathQuery = languageStore.getLocalizedUrl('/');
  const { data: dataGallery, error } = await useAsyncData(
    `dataGallery-${languageStore.keyLangCurrent}`,
    async () => {
      return await queryContent(`${pathQuery}gallery`)
        .where({ _path: `${pathQuery}gallery` })
        .sort({ createdAt: -1 })
        .findOne();
    }
  );
  galleryStore.setGalleryItems(dataGallery.value || null);
}

async function fetchCouponItems() {
  const pathQuery = languageStore.getLocalizedUrl('/');
  const { data: dataCoupon, error } = await useAsyncData(
    `dataCoupon-${languageStore.keyLangCurrent}`,
    async () => {
      return await queryContent(`${pathQuery}coupons`)
        .where({ _path: `${pathQuery}coupons` })
        .sort({ createdAt: -1 })
        .findOne();
    }
  );
  couponStore.setCouponItems(dataCoupon.value || null);
}

async function fetchServicesItems() {
  const pathQuery = languageStore.getLocalizedUrl('/');
  const { data: dataServices } = await useAsyncData(
    `dataServices-${languageStore.keyLangCurrent}`,
    async () => {
      return await queryContent(`${pathQuery}service`)
        .where({ _path: `${pathQuery}service` })
        .sort({ createdAt: -1 })
        .findOne();
    }
  );
  servicesStore.setServicesItems(dataServices.value || null);
}

const init = async () => {
  await Promise.all([
    fetchGalleryItems(),
    fetchCouponItems(),
    fetchServicesItems(),
    fetchPosts()
  ])
  blogStore.buildCategoriesAndTags();
};

watch(
  () => languageStore.keyLangCurrent,
  async () => {
    await init();
  }, { immediate: true }
)

</script>