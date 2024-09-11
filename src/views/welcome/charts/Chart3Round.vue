<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

// 兼容dark主题
const { isDark } = useDark();
let theme = computed(() => {
  return isDark.value ? "dark" : "default";
});

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 初始化ECharts
const chartRef = ref();
const { setOptions } = useECharts(chartRef, { theme, renderer: "svg" });

// 根据配置项渲染ECharts
setOptions({
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "#ccc",
    borderWidth: 1,
    textStyle: {
      color: "#333"
    },
    padding: [8, 12],
    extraCssText: "box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);"
  },
  series: [
    {
      name: "文件类型统计",
      type: "pie",
      radius: ["70%", "95%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 8,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold"
        },
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      labelLine: {
        show: false
      },
      data: props.chartData
    }
  ],
  color: ["#3491FA", "#FADC19", "#F53F3F", "#14C9C9", "#00B42A", "#F7BA1E"]
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 100%" />
</template>
