<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

// 兼容dark主题
const { isDark } = useDark();
let theme = computed(() => {
  return isDark.value ? "dark" : "default";
});

// 初始化ECharts
const chartRef = ref();
const { setOptions } = useECharts(chartRef, { theme });

// 根据配置项渲染ECharts
setOptions({
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      name: "统计",
      type: "pie",
      radius: ["35%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
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
          fontSize: 16,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 100, name: "webg" },
        { value: 200, name: "png" },
        { value: 300, name: "jpg" },
        { value: 400, name: "icon" },
        { value: 500, name: "gif" },
        { value: 100, name: "psd" }
      ]
    }
  ]
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 35vh" />
</template>
