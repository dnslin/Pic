<script setup lang="ts">
import { useDark, useECharts } from "@pureadmin/utils";
import { type PropType, ref, computed, watch, nextTick } from "vue";
import { useWindowSize } from "@vueuse/core";

const props = defineProps({
  requireData: {
    type: Array as PropType<Array<number>>,
    default: () => []
  },
  questionData: {
    type: Array as PropType<Array<number>>,
    default: () => []
  }
});

const { isDark } = useDark();
const { width } = useWindowSize();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});

watch(
  [() => props, width],
  async () => {
    await nextTick();
    setOptions({
      color: ["#3b82f6", "#10b981"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        top: "20px",
        left: "3%",
        right: "4%",
        bottom: "9%",
        containLabel: true
      },
      legend: {
        data: ["上传次数", "访问次数"],
        textStyle: {
          color: "#606266",
          fontSize: "12px"
        },
        bottom: 0
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLabel: {
            fontSize: width.value < 768 ? "10px" : "12px",
            interval: 0,
            rotate: width.value < 768 ? 45 : 0
          },
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            fontSize: width.value < 768 ? "10px" : "12px"
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: "上传次数",
          type: "bar",
          barWidth: width.value < 768 ? 6 : 10,
          itemStyle: {
            color: "#3B83F6B7",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.requireData
        },
        {
          name: "访问次数",
          type: "bar",
          barWidth: width.value < 768 ? 6 : 10,
          itemStyle: {
            color: "#10B981B0",
            borderRadius: [10, 10, 0, 0]
          },
          data: props.questionData
        }
      ]
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%" />
</template>

<style scoped>
.chart-container {
  min-height: 300px;
}
</style>
