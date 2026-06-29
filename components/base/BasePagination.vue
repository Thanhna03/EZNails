<template>
  <div class="" ref="sectionRef">
    <slot :items="paginatedItems" />
    <div class="flex gap-2 items-center justify-center">
      <UPagination
        v-model="currentPage"
        size="sm"
        show-first
        show-last
        :max="7"
        :page-count="1"
        :total="totalPages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[];
  perPage?: number;
  modelValue: number;
}>();

const emit = defineEmits(["update:modelValue"]);
const sectionRef = ref<HTMLElement | null>(null);
const currentPage = computed({
  get: () => props.modelValue,
  set: (val: number) => {
    emit("update:modelValue", val);
  },
});

const perPage = computed(() => props.perPage ?? 10);

const totalPages = computed(() =>
  Math.ceil(props.items.length / perPage.value),
);

watch(currentPage, () => {
  nextTick(() => {
    sectionRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return props.items.slice(start, end);
});
</script>
<style lang="scss" scoped>
:deep(.bg-primary-500) {
  background-color: var(--color-primary) !important;
}

:deep(button[aria-label='Prev']),
:deep(button[aria-label='Next']) {
  display: none !important;
}

</style>
