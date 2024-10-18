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
  <div class="absolute inset-0">
    <div class="max-w-full">
      <GalleryToolbar :selected-count="selectedCount" />
    </div>
    <ImageGallery />
  </div>
</template>
