<template>
  <div class="lg:h-full">
    <!-- Mobile: Sticky Top Bar -->
    <div
      class="lg:hidden sticky top-0 z-[11] h-16 flex items-center justify-between px-4 shadow-md"
      :style="{ backgroundColor: headerData.background_color }"
    >
      <NuxtLink v-if="settingData.logo" :to="homeUrl" class="inline-block h-10">
        <img
          :src="settingData.logo"
          :alt="settingData.logo_alt"
          class="h-full w-auto object-contain"
        />
      </NuxtLink>
      <div ref="menuSpanRef" class="menu__span" @click="openMenu()">
        <span class="menu__open" />
      </div>
    </div>

    <!-- Mobile: Collapsible Sidebar Menu -->
    <div
      ref="heightMenuRef"
      class="lg:hidden mobile-menu"
      :style="{ backgroundColor: headerData.background_color }"
    >
      <div class="pb-6">
        <div class="hidden text-center py-4 px-4 border-b border-white/10">
          <template v-for="(addr, i) in settingData.address" :key="i">
            <a
              v-if="addr.is_show"
              :href="addr.url"
              target="_blank"
              class="block text-xs text-white/60 leading-relaxed hover:text-white/90 transition-colors"
            >
              {{ addr.content }}
            </a>
          </template>
        </div>
        <ul class="list-none mt-2">
          <li v-for="(item, index) in headerData.nav" :key="index">
            <div class="flex items-center">
              <NuxtLink
                :to="item.link"
                :target="item.open_new_tab ? '_blank' : ''"
                class="flex-1 flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
                :class="linkActive === item.link ? 'text-secondary' : 'text-white/80 hover:text-secondary'"
                @click="closeMenu()"
              >
                <span class="text-white/30 text-base">❖</span>
                {{ item.text }}
              </NuxtLink>
              <button
                v-if="item.sub_nav && item.sub_nav.length > 0 && item.sub_nav[0].text"
                @click="toggleMobileSubmenu(index)"
                class="pr-4 text-white/50 hover:text-white/90 transition-colors"
              >
                <UIcon
                  name="i-heroicons-chevron-down"
                  class="transition-transform duration-300"
                  :class="{ 'rotate-180': mobileSubmenuOpen[index] }"
                />
              </button>
            </div>
            <div
              v-if="item.sub_nav && item.sub_nav.length > 0 && item.sub_nav[0].text"
              class="overflow-hidden transition-all duration-300"
              :class="mobileSubmenuOpen[index] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
            >
              <ul class="bg-black/20 border-t border-white/5">
                <li v-for="(subItem, subIndex) in item.sub_nav" :key="subIndex">
                  <NuxtLink
                    :to="subItem.link"
                    :target="subItem.open_new_tab ? '_blank' : ''"
                    class="block pl-12 pr-6 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-secondary transition-colors"
                    @click="closeMenu()"
                  >
                    {{ subItem.text }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div v-if="countries.length > 1" class="px-6 py-3 border-t border-white/10 mt-2">
          <USelect v-model="country" :options="countries" option-attribute="name" />
        </div>
      </div>
    </div>

    <!-- Desktop: Full Sticky Sidebar -->
    <div
      class="hidden lg:flex lg:flex-col lg:sticky lg:top-0"
      :style="{ backgroundColor: headerData.background_color }"
    >
      <!-- Logo & Address -->
      <div class="text-center py-8 px-4 border-b border-white/10">
        <NuxtLink v-if="settingData.logo" :to="homeUrl" class="inline-block mb-3">
          <img
            :src="settingData.logo"
            :alt="settingData.logo_alt"
            class="max-w-[150px] mx-auto object-contain"
          />
        </NuxtLink>
        <template v-for="(addr, i) in settingData.address" :key="i">
          <a
            v-if="addr.is_show"
            :href="addr.url"
            target="_blank"
            class="block text-xs text-white/60 leading-relaxed hover:text-white/90 transition-colors mt-1"
          >
            {{ addr.content }}
          </a>
        </template>
      </div>

      <!-- Collapsible: Nav + Language Switcher -->
      <div
        class="overflow-hidden transition-all duration-500 ease-in-out"
        :class="navCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'"
      >
        <!-- Nav -->
        <nav class="py-4">
          <ul class="list-none">
            <li v-for="(item, index) in headerData.nav" :key="index" class="relative">
              <div class="flex items-center">
                <NuxtLink
                  :to="item.link"
                  :target="item.open_new_tab ? '_blank' : ''"
                  class="flex-1 flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-200"
                  :class="linkActive === item.link ? 'text-secondary' : 'text-white/80 hover:text-secondary'"
                >
                  <span class="text-white/30 text-base">❖</span>
                  {{ item.text }}
                </NuxtLink>
                <button
                  v-if="item.sub_nav && item.sub_nav.length > 0 && item.sub_nav[0].text"
                  @click="toggleMobileSubmenu(index)"
                  class="pr-4 text-white/50 hover:text-white/90 transition-colors"
                >
                  <UIcon
                    name="i-heroicons-chevron-down"
                    class="transition-transform duration-300"
                    :class="{ 'rotate-180': mobileSubmenuOpen[index] }"
                  />
                </button>
              </div>
              <!-- Sub Nav Accordion -->
              <div
                v-if="item.sub_nav && item.sub_nav.length > 0 && item.sub_nav[0].text"
                class="overflow-hidden transition-all duration-300"
                :class="mobileSubmenuOpen[index] ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
              >
                <ul class="bg-black/20 border-t border-white/5">
                  <li v-for="(subItem, subIndex) in item.sub_nav" :key="subIndex">
                    <NuxtLink
                      :to="subItem.link"
                      :target="subItem.open_new_tab ? '_blank' : ''"
                      class="block pl-12 pr-6 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:text-secondary transition-colors"
                    >
                      {{ subItem.text }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <!-- Language Switcher -->
        <div v-if="countries.length > 1" class="px-6 py-4 border-t border-white/10">
          <USelect v-model="country" :options="countries" option-attribute="name" />
        </div>
      </div>

      <!-- Bottom Shape Image + Toggle Button -->
      <div class="relative flex-shrink-0 bg-white">
        <img
          src="/images/header-bottom-shape.png"
          alt=""
          class="w-full block"
        />
        <div class="absolute inset-x-0 top-3 flex justify-center">
          <button
            @click="navCollapsed = !navCollapsed"
            class="w-10 h-10 rounded-full bg-gray-500/70 hover:bg-gray-400/90 flex items-center justify-center transition-colors shadow-lg"
          >
            <UIcon
              :name="navCollapsed ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-up'"
              class="text-white"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import header from "@/data/header.json";
import setting from "@/data/setting.json";
import langSetting from "@/data/lang-setting.json";

const route = useRoute();
const router = useRouter();
const languageStore = useLanguageStore();

const activeMenu = ref<boolean>(false);
const menuSpanRef = ref<HTMLElement | null>(null);
const heightMenuRef = ref<HTMLElement | null>(null);

const keyLangCurrent = computed(() => languageStore.keyLangCurrent);
const countries = computed(() => languageStore.countries);

const country = ref(keyLangCurrent.value);

const headerData = computed(() => languageStore.getLocalizedData(header));
const settingData = computed(() => languageStore.getLocalizedData(setting));
const homeUrl = computed(() => languageStore.getLocalizedUrl("/"));

const availableLangs = computed(() => langSetting.map((l: any) => l.value));
const defaultLang = computed(() => languageStore.defaultLang);

const toLocalizedPath = (path: string, targetLang: string) => {
  const def = defaultLang.value;
  const langs = availableLangs.value;
  let p = path || "/";
  if (!p.startsWith("/")) p = "/" + p;
  const seg = p.split("/")[1];
  const hasPrefix = langs.includes(seg);
  if (targetLang === def) {
    return hasPrefix ? p.replace(`/${seg}`, "") || "/" : p;
  } else {
    return hasPrefix
      ? p.replace(`/${seg}`, `/${targetLang}`)
      : `/${targetLang}${p}`;
  }
};

watch(country, (newCountry) => {
  if (newCountry && newCountry !== keyLangCurrent.value) {
    languageStore.setKeyLangCurrent(newCountry);
    const params = route.query;
    const newPath = toLocalizedPath(route.path, newCountry);
    router.push({ path: newPath, query: params, hash: route.hash });
  }
});

(watch(
  () => languageStore.keyLangCurrent,
  async (newLang) => {
    country.value = newLang;
  },
),
  { deep: true });

const navCollapsed = ref(false);

const mobileSubmenuOpen = ref<any>({});
const mobileSubSubmenuOpen = ref<any>({});

const toggleMobileSubmenu = (index: any) => {
  mobileSubmenuOpen.value[index] = !mobileSubmenuOpen.value?.[index];
};

const toggleMobileSubSubmenu = (parentIndex: any, subIndex: any) => {
  const key = `${parentIndex}-${subIndex}`;
  mobileSubSubmenuOpen.value[key] = !mobileSubSubmenuOpen.value[key];
};

const openMenu = () => {
  if (!heightMenuRef.value) return;
  menuSpanRef.value?.classList.toggle("active");
  activeMenu.value = !activeMenu.value;
  if (activeMenu.value) {
    heightMenuRef.value.style.height = heightMenuRef.value.scrollHeight + "px";
  } else {
    heightMenuRef.value.style.height = "0px";
    mobileSubmenuOpen.value = {};
    mobileSubSubmenuOpen.value = {};
  }
};

const closeMenu = () => {
  mobileSubmenuOpen.value = {};
  mobileSubSubmenuOpen.value = {};
  if (!heightMenuRef.value) return;
  menuSpanRef.value?.classList.remove("active");
  heightMenuRef.value.style.height = "0px";
  activeMenu.value = false;
};

const linkActive = ref<string>("/");
watch(
  () => route.path,
  (value) => {
    if (value === "/") {
      linkActive.value = value;
    } else if (value.includes("blog")) {
      linkActive.value = "/blog";
    } else {
      linkActive.value = value.endsWith("/") ? value.slice(0, -1) : value;
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.mobile-menu {
  height: 0;
  overflow: hidden;
  transition: height 0.5s ease;
}

.menu__span {
  position: relative;
  width: 35px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .menu__open {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 3px;
    background-color: white;
    transition: all 0.15s ease;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    background: white;
    transition: all 0.15s ease;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &.active {
    .menu__open {
      opacity: 0;
    }

    &::before {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }

    &::after {
      bottom: 50%;
      transform: translateY(50%) rotate(-45deg);
    }
  }
}
</style>
