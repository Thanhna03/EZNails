<template>
  <section class="py-10" :data-cms-bind="dataBinding">
    <div class="container">
      <div class="flex flex-col place-items-center space-y-4">
        <img v-if="block.image" :src="block.image" :alt="block.image_alt" class="max-w-screen-md">
        <h1 class="main-heading__title uppercase">
          {{ block.description }}
        </h1>
        <UButton
          to="/"
          icon="i-heroicons-arrow-left-20-solid"
          label="Back to home"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  block: {
    description: string
    image: string
    image_alt: string
  }
  dataBinding?: any
}

defineProps<Props>();
</script>
