<script setup lang="ts">
import { ref, computed } from "vue";
import { useElementSize } from "@vueuse/core";

interface ImageItem {
  id: string;
  src: string;
  type: string;
  aspectRatio: number;
}

const props = defineProps<{
  images: ImageItem[];
  gap?: number;
}>();

const emit = defineEmits(["update:selected"]);

const containerRef = ref<HTMLElement | null>(null);
const { width } = useElementSize(containerRef);
const selectedImages = ref(new Set<string>());

const gridTemplateColumns = computed(() => {
  const minColumnWidth = 200;
  const columnCount = Math.max(1, Math.floor(width.value / minColumnWidth));
  return `repeat(${columnCount}, minmax(0, 1fr))`;
});

function toggleImageSelection(imageId: string) {
  if (selectedImages.value.has(imageId)) {
    selectedImages.value.delete(imageId);
  } else {
    selectedImages.value.add(imageId);
  }
  emit("update:selected", selectedImages.value);
}
</script>

<template>
  <div ref="containerRef" class="gallery-image-grid">
    <div
      class="image-grid"
      :style="{
        gridTemplateColumns,
        gap: `${props.gap || 12}px`
      }"
    >
      <div
        v-for="image in props.images"
        :key="image.id"
        class="image-container"
        :class="{ selected: selectedImages.has(image.id) }"
        @click="toggleImageSelection(image.id)"
      >
        <div class="image-wrapper">
          <img
            :src="image.src"
            :alt="image.type"
            class="image"
            :style="{
              aspectRatio: image.aspectRatio
            }"
          />
          <div class="image-overlay">
            <div class="image-type">{{ image.type }}</div>
          </div>
          <div class="loading-overlay">
            <div class="loader" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gallery-image-grid {
  width: 100%;
  height: 100%;
  padding-right: 8px;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border: 2px solid #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}

.image-grid {
  display: grid;
  grid-auto-rows: auto;
}

.image-container {
  width: 100%;
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.selected {
    padding: 0;
    box-shadow:
      0 0 0 2px #3498db,
      0 0 10px rgb(52 152 219 / 50%);
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgb(0 0 0 / 40%) 0%,
    rgb(0 0 0 / 0%) 30%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-type {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 4px 8px;
  font-size: 12px;
  color: white;
  background-color: rgb(0 0 0 / 60%);
  border-radius: 4px;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255 255 255 / 80%);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
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
