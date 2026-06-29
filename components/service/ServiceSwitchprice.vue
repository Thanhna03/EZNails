<template>
  <section
    v-if="props.block.status"
    :data-cms-bind="props.dataBinding"
    class="lg:py-6 py-4"
    :style="backgroundComputed"
  >
    <div class="container">
      <!-- eslint-disable -->
      <div class="ckeditor-custom" v-html="props.block.content" />
      <button
        class="button_custom"
        :style="buttonComputedCSS"
        @click="handleSwitch"
      >
        See {{ titleButton }} Price
      </button>
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script lang="ts" setup>
import SITE from "@/data/site.json";
import { TYPE_SERVICE } from "~/constant";

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const dataSite: any = ref(SITE);
const firstKey = Object.keys(SITE)[0];
const typePrice = ref(dataSite.value[firstKey].customTax.type);

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background:
          `url(${props.block.background_image}) no-repeat left / cover` || "unset",
      }
    : { backgroundColor: props.block.background_color || "unset" }
);

const currentIndex = computed(() =>
  TYPE_SERVICE.findIndex((item) => item.type === typePrice.value)
);

const nextIndex = computed(() => {
  return (currentIndex.value + 1) % TYPE_SERVICE.length;
});

const titleButton = computed(() => {
  return TYPE_SERVICE[nextIndex.value].text;
});

const classID = computed(() => {
  return TYPE_SERVICE[nextIndex.value].id;
});

const handleSwitch = () => {
  const tab = document.querySelectorAll(`.${classID.value}`);
  tab.forEach((e) => {
    if (!e.classList.contains("active") && e instanceof HTMLElement) {
      e.click();
    }
  });
  typePrice.value = TYPE_SERVICE[nextIndex.value].type;
};

const buttonComputedCSS = computed(() => {
  return {
    backgroundColor: props.block.button.background_color,
    borderWidth: props.block.button.border_width + "px",
    borderStyle: props.block.button.border_style,
    borderColor: props.block.button.border_color,
    borderRadius: props.block.button.border_radius + "px",
    color: props.block.button.color,
  };
});
</script>
<style lang="scss" scoped>
.button_custom {
  font-size: 14px;
  display: block;
  margin: 20px auto 0 auto;
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border: 1px solid #000000;
  padding: 4px 16px;
  border-radius: 4px;
  text-transform: uppercase;
}

.button_custom:hover {
  opacity: 0.75;
}
</style>
