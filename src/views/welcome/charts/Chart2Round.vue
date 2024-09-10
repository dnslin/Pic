<template>
  <div ref="chartRef" style="width: 100%; height: 500px" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme,
  renderer: "svg"
});
const pieData = [
  { statType: "01", name: "jpeg", value: 31, color: "#69DDF1" },
  { statType: "02", name: "jpg", value: 20, color: "#79CE9B" },
  { statType: "03", name: "png", value: 10, color: "#E89B42" },
  { statType: "04", name: "gif", value: 88, color: "#EE7165" },
  { statType: "05", name: "webp", value: 23, color: "#713AEA" },
  { statType: "06", name: "ico", value: 100, color: "#6732E3" },
  { statType: "07", name: "psd", value: 87, color: "#0B63C2" }
];

// 饼图数据处理
const pieDataHandle = function (data) {
  data.sort((a, b) => b.value - a.value);
  data.map(item => {
    return { value: item.value, name: item.name };
  });
  return data;
};

setOptions({
  backgroundColor: "#ffff0000",
  // 颜色配置
  color: pieData.map(el => el.color),
  series: [
    {
      type: "pie",
      roseType: "radius",
      radius: ["12%", "40%"], // 缩小玫瑰图的整体大小
      center: ["40%", "50%"], // 稍微向左移动玫瑰图,为图例腾出更多空间
      data: pieDataHandle(pieData),
      animation: false,
      itemStyle: {
        borderWidth: 0
      },
      labelLine: {
        length: 0
      },
      label: {
        show: true,
        padding: [0, 16, 0, 0], // 减小label的padding
        formatter: params => {
          if (params.name) {
            return "{name|" + params.name + "}";
          }
        },
        rich: {
          name: { fontSize: 14, color: "#586EE9D7" } // 减小label字体大小
        }
      },
      emphasis: {
        focus: "self"
      }
    }
  ]
});
</script>
