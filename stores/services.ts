import { defineStore } from "pinia";

export const useServicesStore = defineStore("services", {
  state: () => {
    return {
      servicesItems: null as any,
    };
  },
  getters: {
    getServicesItems(state) {
      if (!state.servicesItems) return [];
      return state.servicesItems?.content_blocks?.filter(
        (e: any) => e._block_name === "service/item" && e.status && e.is_hot
      );
    },
  },
  actions: {
    setServicesItems(items: any) {
      this.servicesItems = items || null;
    }
  }
});
