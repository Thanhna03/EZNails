<template>
  <NuxtLink
    data-type="button"
    :target="props.isTargetBlank ? '_blank' : ''"
    class="text-sm font-bold capitalize btn__hover inline-flex justify-center items-center px-8 h-9 rounded-full cursor-pointer"
    :class="[{ tab__item: props.tabItem }, { active: props.active }]"
  >
    <span class="">{{ props.text }}</span>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  url?: string;
  text: string;
  isTargetBlank?: boolean;
  tabItem?: boolean;
  active?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isTargetBlank: false,
  text: "Text button",
  tabItem: false,
  active: false,
});
</script>

<style lang="scss" scoped>
.btn__hover {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);

  &:hover {
    opacity: 0.8;
  }

  // Tab item for gallery
  &.tab__item {
    &.active {
      background-color: var(--color-secondary);
      color: var(--color-secondary-foreground);
    }
  }
}
</style>
