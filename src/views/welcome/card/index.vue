<script setup lang="ts">
import { computed } from "vue";
interface CardProps {
  id: string;
  category: string;
  detail: string;
  amount: string;
  isSelected: boolean;
  index: number;
  color?: string;
  chartData?: { value: number; name: string }[];
}

const props = defineProps<CardProps>();

const emit = defineEmits(["select"]);

const cardStyle = computed(() => ({
  "--card-color": props.isSelected ? "#1e293b" : "#ffffff",
  "--text-color": props.isSelected ? "#ffffff" : "#1e293b",
  "--border-color": props.color || "#e2e8f0",
  "--highlight-color": props.color || "#3b82f6"
}));

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" || event.key === " ") {
    emit("select", props.id);
  }
};
</script>

<template>
  <div
    role="button"
    tabindex="0"
    :aria-pressed="isSelected"
    class="stat-card w-full sm:w-72 h-auto sm:h-32"
    :style="cardStyle"
    :class="[
      'rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-sm',
      isSelected ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    ]"
    @click="$emit('select', id)"
    @keydown="handleKeyDown"
  >
    <div class="flex flex-col h-full p-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-lg font-semibold">{{ category }}</span>
        <span
          class="text-xs font-medium px-2 py-1 rounded-full"
          :style="{
            backgroundColor: isSelected ? '#ffffff' : 'var(--highlight-color)',
            color: isSelected ? 'var(--highlight-color)' : '#ffffff'
          }"
        >
          {{ detail }}
        </span>
      </div>
      <div class="flex justify-between items-end mt-auto">
        <div class="text-3xl font-bold">
          {{ amount }}
        </div>
        <div class="chart-container">
          <slot name="chart" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  color: var(--text-color);
  background-color: var(--card-color);
  border-left: 4px solid var(--highlight-color);
  transition: all 0.3s ease;
  will-change: transform;
}

.stat-card:hover {
  box-shadow:
    0 4px 6px rgb(0 0 0 / 5%),
    0 2px 4px rgb(0 0 0 / 3%);
  transform: translateY(-2px);
}

.stat-card:not(.bg-gray-900):hover {
  background-color: #f8fafc;
}

.chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 60px;
}
</style>
