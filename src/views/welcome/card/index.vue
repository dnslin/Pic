<script setup lang="ts">
import { computed } from "vue";
import { ChartLine, Chart3Round, ChartRound } from "../charts";
interface CardProps {
  id: string;
  category: string;
  detail: string;
  amount: string;
  isSelected: boolean;
  index: number;
  color?: string;
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
const getChartComponent = computed(() => {
  if (props.index < 2) return ChartLine;
  if (props.index === 2) return Chart3Round;
  return ChartRound;
});

const chartData = [30, 40, 20, 50, 40, 60, 50, 40, 30, 40, 20, 30];
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
      <div class="mt-auto">
        <div class="text-3xl font-bold">
          {{ amount }}
        </div>
      </div>
      <div class="chart-container">
        <component :is="getChartComponent" :color="color" :data="chartData" />
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
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100px; /* 调整这个值以适应您的需求 */
  overflow: hidden;
}

:deep(.chart-container > div) {
  width: 100%;
  height: 100%;
}
</style>
