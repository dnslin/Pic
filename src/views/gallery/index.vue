<script setup lang="ts">
import { ref, computed } from "vue";
import { GalleryToolbar } from "./bar";

defineOptions({
  name: "Gallery"
});

const selectedImages = ref(new Set<string>());

const selectedCount = computed(() => selectedImages.value.size);
</script>

<template>
  <div class="absolute inset-0 overflow-y-auto">
    <div class="sticky top-0 z-10">
      <div class="max-w-full">
        <GalleryToolbar :selected-count="selectedCount" />
      </div>
    </div>
    <div class="pt-4 w-full bg-cyan-500 mt-2" style="height: 10000px" />
  </div>
</template>
