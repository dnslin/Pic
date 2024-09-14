<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { GalleryToolbar } from "./bar";
import GalleryImageGrid from "./main/GalleryImageGrid.vue";
import { fetchImages, type ImageItem } from "./api";

defineOptions({
  name: "Gallery"
});

const images = ref<ImageItem[]>([]);
const page = ref(1);
const loading = ref(false);
const error = ref<string | null>(null);
const containerRef = ref<HTMLElement | null>(null);
const selectedImages = ref(new Set<string>());

const selectedCount = computed(() => selectedImages.value.size);

async function loadMoreImages() {
  if (loading.value) return;

  loading.value = true;
  error.value = null;

  try {
    const newImages = await fetchImages(page.value);
    images.value.push(...newImages);
    page.value++;
  } catch (err) {
    error.value = "Failed to load images. Please try again.";
  } finally {
    loading.value = false;
  }
}

useInfiniteScroll(
  containerRef,
  () => {
    if (!loading.value && !error.value) {
      loadMoreImages();
    }
  },
  { distance: 100 }
);

onMounted(() => {
  loadMoreImages();
});

function handleImageSelection(imageIds: Set<string>) {
  selectedImages.value = imageIds;
}
</script>

<template>
  <div class="gallery-page">
    <GalleryToolbar :selected-count="selectedCount" />
    <div ref="containerRef" class="gallery-container">
      <GalleryImageGrid
        :images="images"
        :gap="12"
        @update:selected="handleImageSelection"
      />
      <div v-if="loading" class="text-center py-4">
        <div class="loader" />
        <p>Loading more images...</p>
      </div>
      <div v-if="error" class="text-center py-4 text-red-500">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-page {
  @apply h-screen flex flex-col overflow-hidden;
}

.gallery-container {
  @apply flex-grow overflow-hidden;
}

.loader {
  @apply w-8 h-8 border-4 border-gray-200 rounded-full mx-auto;

  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
