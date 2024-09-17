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
  <GalleryToolbar :selected-count="selectedCount" />
</template>
