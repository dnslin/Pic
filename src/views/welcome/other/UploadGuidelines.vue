<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isExpanded = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const guidelines = [
  {
    icon: "mdi:file-alert",
    text: "文件大小限制：20MB",
    color: "text-amber-500"
  },
  {
    icon: "mdi:file-check",
    text: "支持格式：JPG, PNG, GIF, SVG",
    color: "text-emerald-500"
  },
  {
    icon: "mdi:alert-circle",
    text: "禁止上传敏感信息",
    color: "text-rose-500"
  },
  { icon: "mdi:cloud-upload", text: "自动压缩处理", color: "text-sky-500" }
];
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
  >
    <div
      class="flex justify-between items-center p-4 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
      @click="toggleExpand"
    >
      <h3 class="text-lg font-semibold flex items-center space-x-2">
        <Icon icon="mdi:cloud-upload" class="w-6 h-6" />
        <span>上传指南</span>
      </h3>
      <div class="flex items-center space-x-2">
        <span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
          {{ isExpanded ? "收起" : "展开" }}
        </span>
        <Icon
          :icon="isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="w-5 h-5 transition-transform duration-300"
        />
      </div>
    </div>
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-show="isExpanded" class="p-4 bg-gray-50">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="(item, index) in guidelines"
            :key="index"
            class="flex items-center p-3 bg-white rounded-lg shadow transition-all duration-300 hover:shadow-md"
          >
            <Icon :icon="item.icon" :class="[item.color, 'w-5 h-5 mr-3']" />
            <span class="text-sm text-gray-700">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
