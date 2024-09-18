<script setup lang="ts">
import { ref, computed } from "vue";
import { GalleryToolbar } from "./bar";
import ImageGallery from "./ImageGallery.vue";

defineOptions({
  name: "Gallery"
});

const selectedImages = ref(new Set<string>());

const selectedCount = computed(() => selectedImages.value.size);
</script>

<template>
  <div class="absolute inset-0 custom-scrollbar overflow-y-auto">
    <div class="sticky top-0 z-10">
      <div class="max-w-full">
        <GalleryToolbar :selected-count="selectedCount" />
      </div>
    </div>
    <ImageGallery />
  </div>
</template>

<style scoped lang="scss">
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    margin: 5px 0;
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border: 4px solid #f1f1f1;
    border-radius: 20px;

    &:hover {
      background-color: #555;
    }
  }
}
</style>
