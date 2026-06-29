<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <footer>
    <div
      :style="{ backgroundColor: footerData.background_color }"
      class="lg:py-[30px] py-4"
    >
      <div class="container">
        <div
          class="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-6 "
        >
          <div v-if="footerData.nav.label" class="footer_title">
            {{ footerData.nav.label }}
          </div>
          <div
            v-if="footerData.social.title" class="footer_title"
          >
            {{ footerData.social.title }}
          </div>
          <div
            v-if="footerData.contact" class="footer_title"
          >
            {{ footerData.contact }}
          </div>
        </div>
        <div
          class="grid lg:grid-cols-3 grid-cols-1 lg:gap-0 gap-6 items-center"
        >
          <!-- footerData nav -->
          <div class="pmd:y-[35px] py-[25px] sm:px-0 px-6">
            <div class="max-w-[295px] sm:w-auto sm:mx-0 mx-auto">
              <ul class="columns-2">
                <li
                  v-for="(item, index) in footerData.nav?.menu"
                  :key="index"
                  class="mb-[20px] flex items-center gap-[5px]"
                >
                  <img
                    v-if="footerData.nav?.icon"
                    class="w-[14px] h-[14px]"
                    :src="footerData.nav?.icon"
                    :alt="footerData.nav?.icon_alt"
                  />
                  <NuxtLink
                    :target="item?.open_new_tab ? '_blank' : ''"
                    class="text-[14px] nav__footer text-white font-worksans uppercase"
                    :to="item?.link"
                  >
                    {{ item?.text }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="settingData.social.length > 0"
            class="flex flex-col justify-center items-center gap-2 text-white"
          >
            <template v-for="(item, index) in settingData.social" :key="index">
              <NuxtLink
                v-if="item.image"
                :to="item.link"
                :target="item.open_new_tab ? '_blank' : ''"
                class="flex flex-center w-[39px] h-[39px]"
              >
                <img :src="item.image" :alt="item.image_alt" class="image" />
              </NuxtLink>
            </template>
          </div>
          <div class="w-full flex flex-col gap-6">
            <div class=" container flex-col gap-6 lg:justify-between text-white">
              <!-- Address -->
              <div class="flex flex-col gap-4 pb-4">
                <template
                  v-for="(item, index) in settingData.address"
                  :key="index"
                >
                  <div
                    class="flex justify-start items-center gap-4 text-white"
                    v-if="item.is_show"
                  >
                    <div class="">
                      <p class="font-bold text-lg leading-6">
                        {{ item.label }}
                      </p>
                      <NuxtLink :to="item.url" target="_blank">{{
                        item.content
                      }}</NuxtLink>
                    </div>
                  </div>
                </template>
              </div>
              <!-- Phone -->
              <div class="flex flex-col gap-4">
                <div
                  class="flex justify-start items-center gap-4 text-white"
                  v-for="(item, index) in settingData.phone"
                  :key="index"
                >
                  <template v-if="item.is_show">
                    <div class="">
                      <p class="font-bold text-lg leading-6">
                        {{ item.label }}
                      </p>
                      <NuxtLink :to="item.url">{{ item.content }}</NuxtLink>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div
              class="container flex lg:justify-between text-white"
            >
              <div
                v-if="footerData.copyright"
                class="ckeditor-custom lg:text-start text-center text-[13px]"
                v-html="footerData.copyright"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import footer from "@/data/footer.json";
import setting from "@/data/setting.json";
const languageStore = useLanguageStore();

const footerData = computed(() => languageStore.getLocalizedData(footer));
const settingData = computed(() => languageStore.getLocalizedData(setting));
const homeUrl = computed(() => languageStore.getLocalizedUrl("/"));

// const isShowButtonToTop = ref<boolean>(false)
// const scrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth'
//   })
// }
// onMounted(() => {
//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 200) {
//       isShowButtonToTop.value = true
//     } else {
//       isShowButtonToTop.value = false
//     }
//   })
// })
</script>

<style>
.google-maps {
  position: relative;
  height: 260px;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
}

.footer_title {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #eeeded;
  font-family: "Roboto Condensed", Arial, sans-serif;
  font-size: 19.84px;
  font-weight: 300;
  text-transform: uppercase;
  border-bottom: 1px solid #242425;

  padding-bottom: 15px;
  margin-bottom: 15px;
}
</style>
