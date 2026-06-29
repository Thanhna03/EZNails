import { defineStore } from "pinia";

export const useCouponStore = defineStore("coupon", {
  state: () => {
    return {
      couponItems: null as any,
    };
  },
  getters: {
    getCouponItems(state) {
      if (!state.couponItems) return [];
      return state.couponItems?.content_blocks
        .find((block: any) => block._block_name === 'coupon/hero' && block.status)?.list_item
        .filter((coupon: any) => coupon.is_hot)
    },
  },
  actions: {
    setCouponItems(items: any) {
      this.couponItems = items || null;
    }
  }
});
