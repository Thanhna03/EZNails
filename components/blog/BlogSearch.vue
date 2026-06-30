<template>
  <div>
    <h3 class=" text-[#eaae05] text-lg font-bold mb-2">Search</h3>
    <div class=" relative w-full border !border-l-0 mb-7">
      <span class="absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5" />
    </div>
    <form class="flex justify-center h-9 items-center " @submit.prevent="handleSearch">
      <input v-model="searchValue"
        class="outline-none text-black w-full h-full py-1 px-3 rounded-none block border-0 ring-1 ring-inset ring-border placeholder:text-text-muted focus:ring-1 focus:ring-inset focus:ring-main"
        type="text" placeholder="Search">
      <button type="submit"
        class=" disabled:hover:opacity-100 px-3 h-full py-2 bg-main hover:opacity-85 flex justify-center items-center">
        <UIcon name="i-heroicons-magnifying-glass" class=" text-sm text-main-foreground font-bold" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const { searchValue, handleSearch } = useBlogSearch()

</script>
