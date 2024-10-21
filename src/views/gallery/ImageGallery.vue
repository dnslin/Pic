<template>
  <div class="flex pb-20 overflow-hidden" style="height: 820px">
    <div
      ref="scrollContainer"
      class="w-full mt-2 relative min-h-[400px] overflow-y-auto pure-scrollbar"
    >
      <div
        v-if="imageStore.loading && imageStore.images.length === 0"
        class="absolute inset-0 flex flex-col items-center justify-center"
      >
        <el-icon
          class="animate-spin text-6xl text-blue-500 dark:text-blue-400 mb-4"
        >
          <Loading />
        </el-icon>
        <p class="text-lg text-gray-600 dark:text-gray-300">正在加载图片...</p>
      </div>
      <div
        v-else-if="imageStore.images.length === 0"
        class="absolute inset-0 flex items-center justify-center"
      >
        <p class="text-lg text-gray-600 dark:text-gray-300">暂无图片</p>
      </div>
      <VirtualWaterfall
        v-else
        rowKey="id"
        :items="imageStore.images"
        :calc-item-height="calcItemHeight"
        :item-min-width="itemMinWidth - 100"
        :gap="8"
        :padding="0"
        :virtual="true"
        :preload-screen-count="[1, 2]"
        class="w-full"
      >
        <template #default="{ item }: { item: ImageItem }">
          <div class="image-item">
            <el-image
              :alt="item.id"
              :src="item.src"
              class="w-full rounded-md"
              loading="lazy"
              fit="cover"
            />
          </div>
        </template>
      </VirtualWaterfall>
      <div
        v-if="imageStore.loading && imageStore.images.length > 0"
        class="w-full flex justify-center py-4"
      >
        <el-icon class="animate-spin text-4xl text-blue-500 dark:text-blue-400">
          <Loading />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { VirtualWaterfall } from "@lhlyu/vue-virtual-waterfall";
import { useImageStore } from "@/store/modules/image";
import type { ImageItem } from "./api";
import { Loading } from "@element-plus/icons-vue";
import { useWindowSize, useInfiniteScroll } from "@vueuse/core";

const imageStore = useImageStore();
const { width } = useWindowSize();

const itemMinWidth = computed(() => {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  const availableWidth = width.value - scrollbarWidth;
  if (availableWidth < 640) return Math.max(150, availableWidth - 32); // 小屏幕设备
  if (availableWidth < 1024) return Math.max(180, (availableWidth - 48) / 3); // 中等屏幕设备
  return Math.max(220, (availableWidth - 64) / 4); // 大屏幕设备
});

const calcItemHeight = (item: ImageItem, itemWidth: number) => {
  console.log(itemWidth, item.aspectRatio);
  return itemWidth / item.aspectRatio;
};

const loadMore = () => {
  if (!imageStore.loading && !imageStore.allLoaded) {
    imageStore.fetchImages();
  }
};

const scrollContainer = ref(null);

useInfiniteScroll(
  scrollContainer,
  () => {
    loadMore();
  },
  { distance: 200 }
);

onMounted(() => {
  if (imageStore.images.length === 0) imageStore.fetchImages();
});
</script>

<style scoped lang="scss">
.image-item {
  @apply w-full rounded-sm shadow-md transition-transform duration-300 ease-in-out dark:shadow-gray-700;

  max-width: 100%;
}

@media (width <= 640px) {
  .image-item {
    @apply shadow-sm;
  }

  .image-item:hover {
    @apply transform-none;
  }
}

.custom-scrollbar {
  scrollbar-color: rgb(63 64 66) transparent;
}
</style>
