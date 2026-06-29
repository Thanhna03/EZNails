<template>
  <div class="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
    <!-- Phone Buttons -->
    <template
      v-for="(button, index) in footerData.button_phone"
      :key="'phone-' + index"
    >
      <NuxtLink
        v-if="button.is_show"
        :to="button.link"
        data-type="button"
        class="rounded-md px-4 py-2 text-sm flex items-center justify-center gap-2"
        :style="{
          backgroundColor: button.background_color,
          color: button.text_color,
        }"
        :title="button.label"
      >
        <img
          v-if="button.image"
          :src="button.image"
          :alt="button.label"
          class="h-5"
        />
        <span class="">{{ button.label }}</span>
      </NuxtLink>
    </template>

    <!-- Booking Buttons -->
    <template
      v-for="(button, index) in footerData.button_book"
      :key="'book-' + index"
    >
      <NuxtLink
        v-if="button.is_show"
        :to="button.link || settingData.link_booking"
        data-type="button"
        :target="button.open_new_tab ? '_blank' : ''"
        class="rounded-md px-4 py-2 text-sm flex items-center justify-center flex-col gap-2"
        :style="{
          backgroundColor: button.background_color,
          color: button.text_color,
        }"
        :title="button.label"
      >
        <img
          v-if="button.image"
          :src="button.image"
          :alt="button.label"
          class="h-5"
        />
        <span class="">{{ button.label }}</span>
      </NuxtLink>
    </template>

    <!-- Back to Top Button -->
    <button
      v-show="footerData.button_to_top?.is_show"
      @click="scrollToTop"
      :class="
        isShowBackToTop
          ? 'opacity-60 hover:opacity-100'
          : 'opacity-0 pointer-events-none'
      "
      class="rounded-full w-12 h-12 bg-gray-400 text-white flex transition-all duration-200 items-center justify-center animate-fade-in ml-auto"
      title="Back to top"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import footer from "@/data/footer.json";
import setting from "@/data/setting.json";

const languageStore = useLanguageStore();
const footerData = computed(() => languageStore.getLocalizedData(footer));
const settingData = computed(() => languageStore.getLocalizedData(setting));

const isShowBackToTop = ref(false);

const handleScroll = () => {
  isShowBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
