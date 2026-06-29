<template>
  <div v-if="tags?.length > 0">
    <h3 class=" text-main text-lg font-bold mb-2">Tags</h3>
    <div class=" relative w-full border !border-l-0 mb-3">
      <span class=" absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5" />
    </div>
    <div class="flex gap-2 justify-start items-center flex-wrap">
      <NuxtLink v-for="(item, index) in tags" :key="index" :to="routePathTag(item)"
        :target="item?.open_new_tab ? '_blank' : ''"
        class="text-main-foreground text-sm rounded bg-main hover:opacity-80 transition-all duration-300 py-2 sm:px-4 px-2 w-fit">
        {{ item.text }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { routePathTag, tags } = useBlogTag()
</script>
