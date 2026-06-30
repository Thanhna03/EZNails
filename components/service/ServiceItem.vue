<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="py-6"
    :style="backgroundComputed"
  >
    <div class="container">
      <div>
        <div
          :id="`${block.title.split(' ').join('')}`"
          :class="
            block.is_reverse
              ? 'md:grid-cols-[8fr_4fr]'
              : 'md:grid-cols-[4fr_8fr]'
          "
          class="grid sm:gap-5 gap-3"
          itemscope
          itemtype="http://schema.org/Service"
        >
          <meta itemprop="serviceType" :content="props.block.title" />
          <div
            itemprop="provider"
            itemscope
            :itemtype="businessTypeURL"
            hidden
          >
            <meta itemprop="name" :content="businessName" />
            <meta itemprop="url" :content="baseURL" />
          </div>
          <div
            v-if="block?.image"
            :class="block.is_reverse ? 'md:order-1' : 'md:-order-1'"
            class="sm:w-[315px] w-[250px] mx-auto"
          >
            <img
              :src="block.image"
              :alt="block.image_alt"
              :title="block.image_alt"
              itemprop="image"
              class="w-[250px] object-cover border-[3px] mb-4 border-radius rounded-full border-secondary"
            />
          </div>
          <div>
            <h3
              class="mb-1 inline-block text-center text-2xl text-secondary uppercase"
              itemprop="name"
            >
              {{ block.title }}
            </h3>
            <div
              v-if="block?.description_simple"
              class="ckeditor-custom text-foreground mb-2.5"
              itemprop="description"
              v-html="block?.description_simple"
            />
            <ul
              v-show="block?.is_show_switch_price"
              class="flex justify-end items-center gap-2 py-2.5 sm:w-auto md:w-full"
            >
              <li
                v-for="item in typeService"
                :key="item.type"
                class="sm:text-xl text-lg px-2 cursor-pointer font-bold li__switch"
                :class="{ active: typePrice === item.type, [item.id]: item.id }"
                @click="handleSwitch(item.id, item.type, $event)"
              >
                {{ item.text }}
              </li>
            </ul>
            <div v-for="(item, index) in block?.list_service" :key="index">
              <div
                :class="
                  item?.label ? 'mb-2.5 flex items-center justify-between' : ''
                "
              >
                <span
                  v-if="item?.label"
                  class="pr-1 inline-block font-semibold text-foreground"
                  >{{ item?.label }}</span
                >
                <span
                  v-if="item?.label"
                  class="flex-1 h-[15px] border-b-[1px] border-dotted border-border -mt-[8px]"
                ></span>
                <span
                  v-if="item?.price"
                  class="pl-1 inline-block text-foreground"
                  >{{ getPrice(item?.price) }}</span
                >
              </div>
              <div
                v-if="item?.description_simple"
                class="ckeditor-custom text-foreground mb-4"
                v-html="item?.description_simple"
              ></div>
            </div>
            <div class="md:pl-[10px] pl-1">
              <div v-for="(item, index) in block?.second_cat" :key="index">
                <h3
                  class="inline-block text-center text-2xl text-secondary font-semibold"
                >
                  {{ item.title }}
                </h3>
                <div
                  v-if="item?.description_simple"
                  class="ckeditor-custom text-foreground mb-4"
                  v-html="item?.description_simple"
                ></div>
                <div
                  v-for="(subitem, index) in item?.list_service"
                  :key="index"
                >
                  <div
                    :class="
                      subitem?.label
                        ? 'mb-4 flex items-center justify-between'
                        : ''
                    "
                  >
                    <span
                      v-if="subitem?.label"
                      class="pr-1 inline-block font-semibold text-foreground"
                      >{{ subitem?.label }}</span
                    >
                    <span
                      v-if="subitem?.label"
                      class="flex-1 h-[15px] border-b-[1px] border-dotted border-border -mt-[8px]"
                    ></span>
                    <span
                      v-if="subitem?.price"
                      class="pl-1 inline-block font-semibold text-foreground"
                      >{{ getPrice(subitem?.price) }}</span
                    >
                  </div>
                  <div
                    v-if="subitem?.description_simple"
                    class="ckeditor-custom mb-4"
                    v-html="subitem?.description_simple"
                  ></div>
                </div>
                <div class="md:pl-[10px] pl-1">
                  <div v-for="(item, index) in block?.second_cat" :key="index">
                    <div class="md:pl-[10px] pl-1">
                      <div
                        v-for="(subitem, index) in item?.third_cat"
                        :key="index"
                      >
                        <h3
                          class="inline-block text-center text-2xl text-secondary font-semibold"
                        >
                          {{ subitem.title }}
                        </h3>
                        <div
                          v-if="subitem?.description_simple"
                          class="ckeditor-custom mb-4"
                          v-html="subitem?.description_simple"
                        ></div>
                        <div
                          v-for="(subitemMenu, index) in subitem?.list_service"
                          :key="index"
                        >
                          <div
                            :class="
                              subitemMenu?.label
                                ? 'mb-2.5 flex items-center justify-between'
                                : ''
                            "
                          >
                            <span
                              v-if="subitemMenu?.label"
                              class="pr-1 inline-block text-foreground"
                              >{{ subitemMenu?.label }}</span
                            >
                            <span
                              v-if="subitemMenu?.label"
                              class="flex-1 h-[15px] border-b-[1px] border-dotted border-border -mt-[8px]"
                            ></span>
                            <span
                              v-if="subitemMenu?.price"
                              class="pl-1 inline-block  text-foreground"
                              >{{ getPrice(subitemMenu?.price) }}</span
                            >
                          </div>
                          <div
                            v-if="subitemMenu?.description_simple"
                            class="ckeditor-custom mb-4 text-text-secondary"
                            v-html="subitemMenu?.description_simple"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const {
  getPrice,
  handleSwitch,
  typeService,
  typePrice,
  businessTypeURL,
  businessName,
  baseURL,
} = useService();
const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`,
      }
    : { backgroundColor: props.block.background_color }
);
</script>
<style lang="scss" scoped>
.li__switch {
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}

.li__switch.active {
  color: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
