<template>
  <div class="min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-[3fr_7fr] container gap-4">
      <!-- Left: Sticky Sidebar -->
      <div class="lg:h-full">
        <MainHeader />
      </div>
      <!-- Right: Page Content -->
      <div>
        <main class="grow">
          <slot />
        </main>
        <MainFooter />
        <MainFloatingButtons />
      </div>
    </div>

    <div class="sr-only">
      <!-- Logo -->
      <img v-if="settingData.logo" itemprop="logo" :src="settingData.logo" :alt="settingData.logo_alt || 'Logo'" />

      <!-- Address -->
      <template v-for="(info, index) in settingData.address" :key="'address-' + index">
        <meta v-if="info.is_show" itemprop="hasMap" :content="info.url" />
        <div v-if="info.is_show" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
          <span itemprop="streetAddress">{{ info.content }}</span>
        </div>
      </template>

      <!-- Telephone -->
      <template v-for="(info, index) in settingData.phone" :key="'phone-' + index">
        <a v-if="info.is_show" :href="info.url || 'tel:' + info.content" itemprop="url">
          <span itemprop="telephone">{{ info.content }}</span>
        </a>
      </template>

      <!-- Email -->
      <template v-for="(info, index) in settingData.email" :key="'email-' + index">
        <a v-if="info.is_show" :href="info.url || 'mailto:' + info.content" itemprop="url">
          <span itemprop="email">{{ info.content }}</span>
        </a>
      </template>

      <!-- Social Links -->
      <template v-for="(info, index) in settingData.social" :key="'social-' + index">
        <a v-if="info.is_show" :href="info.link" itemprop="sameAs">
          <img :src="info.image" :alt="info.image_alt || 'social link'" />
        </a>
      </template>

      <!-- Opening Hours -->
      <template v-if="settingData.business?.is_show">
        <div v-for="(item, index) in settingData.business.list_item" :key="'hours-' + index"
          itemprop="openingHours" :content="`${item?.label} ${item?.content}`"></div>
      </template>

      <!-- Navigation -->
      <nav v-if="headerData?.nav?.length">
        <template v-for="(item, index) in headerData.nav" :key="'nav-' + index">
          <a :href="item.link" itemprop="url">
            <span itemprop="name">{{ item.text }}</span>
          </a>
          <template v-for="(subItem, subIndex) in item.sub_nav" :key="'sub-' + subIndex">
            <a :href="subItem.link" itemprop="url">
              <span itemprop="name">{{ subItem.text }}</span>
            </a>
            <template v-for="(subSubItem, subSubIndex) in subItem.sub_nav" :key="'subsub-' + subSubIndex">
              <a :href="subSubItem.link" itemprop="url">
                <span itemprop="name">{{ subSubItem.text }}</span>
              </a>
            </template>
          </template>
        </template>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
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
