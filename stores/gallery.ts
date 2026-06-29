import { defineStore } from "pinia";

export const useGalleryStore = defineStore("gallery", {
  state: () => {
    return {
      galleryItems: null as any,
    };
  },
  getters: {
    getGalleryItems(state) {
      if (!state.galleryItems) return [];
      return state.galleryItems?.content_blocks
        .find((block: any) => block._block_name === 'gallery/hero' && block.status)?.gallery
        .filter((gallery: any) => gallery.is_hot)
        .flatMap((gallery: any) => gallery.item.filter((img: any) => img.is_hot))
    },
  },
  actions: {
    setGalleryItems(items: any) {
      this.galleryItems = items || null;
    }
  }
});
