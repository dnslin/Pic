import { defineStore } from "pinia";
import type { ImageItem } from "@/views/gallery/api";
import { fetchImages as apiFetchImages } from "@/views/gallery/api";

export const useImageStore = defineStore("images", {
  state: () => ({
    images: [] as ImageItem[],
    loading: false,
    error: "",
    allLoaded: false,
    page: 1,
    perPage: 20
  }),
  actions: {
    async fetchImages() {
      if (this.loading || this.allLoaded) return;

      this.loading = true;
      try {
        const newImages = await apiFetchImages(this.page);
        if (newImages.length < this.page) {
          this.allLoaded = true;
        }
        this.images = [...this.images, ...newImages];
        this.page += 1;
      } catch (error) {
        this.error = "Failed to fetch images";
        console.error("Error fetching images:", error);
      } finally {
        this.loading = false;
      }
    },
    reset() {
      this.images = [];
      this.loading = false;
      this.error = "";
      this.allLoaded = false;
      this.page = 1;
    }
  }
});
