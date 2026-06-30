<template>
  <div>
    <!-- <div class="grid grid-cols-1 lg:grid-cols-[3fr_7fr]">
      <div class="lg:h-full">
        <MainHeader />
      </div>
      <div class="relative w-full">
        <HomeHero />
        <main>
          <slot />
        </main>
        <MainFloatingButtons />
      </div>
    </div> -->
    <div class="relative w-full">
      <div class="absolute top-0 left-10 w-fit z-50">
        <MainHeader />
      </div>
      <div class="relative w-full">
        <HomeHero />
        <main>
          <slot />
        </main>
        <MainFloatingButtons />
      </div>
    </div>

    <div class="sr-only">
      <img
        v-if="settingData.logo"
        itemprop="logo"
        :src="settingData.logo"
        :alt="settingData.logo_alt || 'Logo'"
      />
      <template
        v-for="(info, index) in settingData.address"
        :key="'address-' + index"
      >
        <meta v-if="info.is_show" itemprop="hasMap" :content="info.url" />
        <div
          v-if="info.is_show"
          itemprop="address"
          itemscope
          itemtype="https://schema.org/PostalAddress"
        >
          <span itemprop="streetAddress">{{ info.content }}</span>
        </div>
      </template>
      <template
        v-for="(info, index) in settingData.phone"
        :key="'phone-' + index"
      >
        <a
          v-if="info.is_show"
          :href="info.url || 'tel:' + info.content"
          itemprop="url"
        >
          <span itemprop="telephone">{{ info.content }}</span>
        </a>
      </template>
      <template
        v-for="(info, index) in settingData.email"
        :key="'email-' + index"
      >
        <a
          v-if="info.is_show"
          :href="info.url || 'mailto:' + info.content"
          itemprop="url"
        >
          <span itemprop="email">{{ info.content }}</span>
        </a>
      </template>
      <template
        v-for="(info, index) in settingData.social"
        :key="'social-' + index"
      >
        <a v-if="info.is_show" :href="info.link" itemprop="sameAs">
          <img :src="info.image" :alt="info.image_alt || 'social link'" />
        </a>
      </template>
      <template v-if="settingData.business?.is_show">
        <div
          v-for="(item, index) in settingData.business.list_item"
          :key="'hours-' + index"
          itemprop="openingHours"
          :content="`${item?.label} ${item?.content}`"
        />
      </template>
      <nav v-if="headerData?.nav?.length">
        <template v-for="(item, index) in headerData.nav" :key="'nav-' + index">
          <a :href="item.link" itemprop="url"
            ><span itemprop="name">{{ item.text }}</span></a
          >
          <template
            v-for="(subItem, subIndex) in item.sub_nav"
            :key="'sub-' + subIndex"
          >
            <a :href="subItem.link" itemprop="url"
              ><span itemprop="name">{{ subItem.text }}</span></a
            >
          </template>
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeHero from "@/components/main/HomeHero.vue";
import header from "@/data/header.json";
import setting from "@/data/setting.json";

const languageStore = useLanguageStore();
const settingData = computed(() => languageStore.getLocalizedData(setting));
const headerData = computed(() => languageStore.getLocalizedData(header));
</script>

<style scoped>
.sr-only {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}
</style>
