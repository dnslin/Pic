<script setup lang="ts">
import { ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import StatCard from "./card/index.vue";
import { Announcement, UploadGuidelines } from "./other";
import { ChartLine, ChartRound, Chart3Round, ChartBar } from "./charts";
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
    color: "#3b82f6",
    chartComponent: ChartLine,
    chartProps: { data: [30, 40, 20, 50, 40, 60, 70], color: "#3b82f6" }
  },
  {
    id: "2",
    category: "图库信息",
    detail: "图片总量",
    amount: "9.27W",
    color: "#10b981",
    chartComponent: ChartLine,
    chartProps: { data: [60, 30, 40, 20, 30, 40, 50], color: "#10b981" }
  },
  {
    id: "3",
    category: "存储详情",
    detail: "当前使用存储",
    amount: "63G",
    color: "#f59e0b",
    chartComponent: Chart3Round,
    chartData: [
      { value: 100, name: "webg" },
      { value: 200, name: "png" },
      { value: 300, name: "jpg" },
      { value: 400, name: "icon" },
      { value: 500, name: "gif" },
      { value: 100, name: "psd" }
    ]
  },
  {
    id: "4",
    category: "存储容量",
    detail: "总可用存储",
    amount: "500G",
    color: "#6366f1",
    chartComponent: ChartRound
  }
];

// 添加ChartBar所需的数据
const barChartData = ref({
  requireData: [120, 200, 150, 80, 70, 110, 130],
  questionData: [130, 180, 160, 90, 80, 100, 120]
});

// 公告内容
const announcementMessage = ref(
  "欢迎使用我们的图片管理系统！我们最近更新了存储功能，现在可以支持更大的文件上传。"
);
const showAnnouncement = ref(true);

// 处理公告关闭
const handleAnnouncementClose = () => {
  showAnnouncement.value = false;
};

// 卡片逻辑
const selectCard = (cardId: string) => {
  selectedCard.value = cardId;
};
// 卡片宽度逻辑
const getColSpan = (index: number) => {
  if (width.value < 768) return 24; // 小屏幕时，每个卡片占满一行
  if (width.value < 1200) return index < 2 ? 12 : 24; // 中等屏幕时，前两个卡片并排，后两个各占一行
  return 6; // 大屏幕时，四个卡片并排
};
// 柱状图宽度逻辑
const getBarChartSpan = () => {
  if (width.value < 768) return 24; // 小屏幕时，柱状图占满一行
  return 16; // 大屏幕时，柱状图占据2/3宽度
};
</script>

<template>
  <div>
    <Announcement
      v-if="showAnnouncement"
      :message="announcementMessage"
      @close="handleAnnouncementClose"
    />
    <UploadGuidelines class="mb-3" />
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
        >
          <template #chart>
            <component
              :is="card.chartComponent"
              v-bind="card.chartProps || {}"
              :chartData="card.chartData"
            />
          </template>
        </StatCard>
      </el-col>
      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="getBarChartSpan()"
        :lg="16"
        class="mb-4"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: 80 * (cardData.length + 1) }
        }"
      >
        <div class="chart-container">
          <ChartBar
            :requireData="barChartData.requireData"
            :questionData="barChartData.questionData"
          />
        </div>
      </el-col>
      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="getBarChartSpan()"
        :lg="8"
        class="mb-4"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: 80 * (cardData.length + 2) }
        }"
      >
        <div class="w-full h-full bg-fuchsia-300" />
      </el-col>
      <el-col
        v-motion
        :xs="24"
        :sm="24"
        :md="getBarChartSpan()"
        :lg="24"
        class="mb-4"
        :initial="{ opacity: 0, y: 100 }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: { delay: 80 * (cardData.length + 3) }
        }"
      >
        <div class="w-full h-36 bg-cyan-300" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
:deep(.el-col) {
  display: flex;
}

:deep(.el-col > div) {
  width: 100%;
}

.chart-container {
  width: 100%;
  height: 400px; /* 可以根据需要调整高度 */
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
