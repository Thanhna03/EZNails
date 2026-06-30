<template>
  <div v-if="categories?.length > 0">
    <h3 class=" text-[#eaae05] text-lg font-bold mb-2">Category</h3>
    <div class=" relative w-full border !border-l-0 mb-3">
      <span class=" absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5" />
    </div>
    <div v-for="(item, index) in categories" :key="index" class="flex flex-col gap-4">
      <NuxtLink v-if="item?.text" :target="item?.open_new_tab ? '_blank' : ''"
        :to="routePathCategory(item)"
        :class="isActive(item) ? 'text-main' : ''"
        class="capitalize hover:text-foreground sm:text-white text-sm">
        {{ item?.text }} ({{ CountPostCategory(item?.text) }})
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { CountPostCategory, routePathCategory, categories, isActive } = useBlogCategory()
</script>
