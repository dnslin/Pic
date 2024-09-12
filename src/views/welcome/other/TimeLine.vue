<script setup lang="ts">
import { markRaw } from "vue";
import { randomGradient } from "@pureadmin/utils";
import { useRenderFlicker } from "@/components/ReFlicker";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Iphone from "@iconify-icons/ep/iphone";

defineOptions({
  name: "TimeLine"
});

const date = new Date();
const lastBuildTime = date
  .toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
  .replace(/\//g, "/");
const activities = [
  {
    content: "图片A上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker())
  },
  {
    content: "图片B上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker({ borderRadius: 0, background: "#67C23A" }))
  },
  {
    content: "图片C上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(
      useRenderFlicker({
        background: randomGradient({
          randomizeHue: true
        })
      })
    )
  },
  {
    content: "图片E上传成功",
    timestamp: lastBuildTime,
    color: "#F56C6C"
  },
  {
    content: "图片F上传成功",
    timestamp: lastBuildTime,
    color: "transparent",
    icon: useRenderIcon(Iphone, {
      color: "#0bbd87"
    })
  },
  {
    content: "图片G上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(useRenderFlicker())
  },
  {
    content: "图片H上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(
      useRenderFlicker({ borderRadius: 0, background: "#C9872AFF" })
    )
  },
  {
    content: "图片I上传成功",
    timestamp: lastBuildTime,
    icon: markRaw(
      useRenderFlicker({
        background: randomGradient({
          randomizeHue: true
        })
      })
    )
  }
];
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :color="activity.color"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped>
.message {
  position: relative;
  box-sizing: border-box;
  width: 200px;
  padding: 5px 12px;
  line-height: 18px;
  color: #fff;
  word-break: break-all;
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  border-radius: 6px;
}

.message::after {
  position: absolute;
  top: 8px;
  left: -10px;
  width: 0;
  height: 0;
  overflow: hidden;
  content: "";
  border-color: var(--el-color-primary) transparent transparent;
  border-style: solid dashed dashed;
  border-width: 10px;
}
</style>
