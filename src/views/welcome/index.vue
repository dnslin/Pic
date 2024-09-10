<script setup lang="ts">
import { ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import StatCard from "./card/index.vue";
defineOptions({
  name: "Welcome"
});

const selectedCard = ref(null);
const { width } = useWindowSize();

const cardData = [
  {
    id: "1",
    category: "今日上传",
    detail: "已上传文件数",
    amount: "327",
    color: "#3b82f6"
  },
  {
    id: "2",
    category: "图库信息",
    detail: "图片总量",
    amount: "9.27W",
    color: "#10b981"
  },
  {
    id: "3",
    category: "存储详情",
    detail: "当前使用存储",
    amount: "63G",
    color: "#f59e0b"
  },
  {
    id: "4",
    category: "存储容量",
    detail: "总可用存储",
    amount: "500G",
    color: "#6366f1"
  }
];

const selectCard = (cardId: string) => {
  selectedCard.value = cardId;
};
const getColSpan = (index: number) => {
  if (width.value < 768) return 24; // 小屏幕时，每个卡片占满一行
  if (width.value < 1200) return index < 2 ? 12 : 24; // 中等屏幕时，前两个卡片并排，后两个各占一行
  return 6; // 大屏幕时，四个卡片并排
};
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <el-col
        v-for="(card, index) in cardData"
        :key="card.id"
        v-motion
        :xs="24"
        :sm="12"
        :md="getColSpan(index)"
        :lg="6"
        class="mb-4"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 80 * (index + 1) } }"
      >
        <StatCard
          v-bind="card"
          :is-selected="selectedCard === card.id"
          :index="index"
          @select="selectCard"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.welcome-container {
  padding: 1rem;
}

@media (width <= 768px) {
  .welcome-container {
    padding: 0.5rem;
  }
}

:deep(.el-col) {
  display: flex;
}

:deep(.el-col > div) {
  width: 100%;
}
</style>
