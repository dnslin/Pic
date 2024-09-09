<script setup lang="tsx">
import { ref } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import { storageLocal } from "@pureadmin/utils";
import { useLayout } from "@/layout/hooks/useLayout";
import { type DataInfo, userKey, multipleTabsKey } from "@/utils/auth";
import { addDialog } from "@/components/ReDialog";
import UploadIndex from "./upload/index.vue";
import ReButton from "@/views/common/ReButton.vue";

defineOptions({
  name: "PureIndex"
});
const router = useRouter();
const { initStorage } = useLayout();
initStorage();

// 登录信息
const userInfo = storageLocal().getItem<DataInfo<number>>(userKey);

const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);

// handLogin 跳转登录页
function handleLogin() {
  // 如果已经包含token，直接跳转到首页
  if (Cookies.get(multipleTabsKey) && userInfo) {
    router.push("/welcome");
    return;
  }
  router.push("/login");
}

// 查看详细信息的弹出框
function handleView() {
  // 延迟0.3s
  setTimeout(() => {
    addDialog({
      draggable: true,
      showClose: true,
      fullscreen: true,
      hideFooter: true,
      class: "custom-dialog",
      style: {
        padding: "0px"
      },
      contentRenderer: () => UploadIndex
    });
  }, 400);
}
</script>

<template>
  <div
    class="relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-black transition-bg"
  >
    <div class="absolute top-0 right-0 m-4 z-10">
      <button
        class="px-3 py-1 border border-stone-200 rounded-lg drop-shadow-sm text-sm text-stone-800 dark:text-white bg-white/80 dark:bg-black/40 backdrop-blur-lg hover:border-stone-300 transition-colors dark:border-stone-500 dark:hover:border-stone-400"
        @click="handleLogin"
      >
        Login
      </button>
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        class="ml-2"
        @change="dataThemeChange"
      />
    </div>
    <div class="absolute inset-0 overflow-hidden">
      <div class="jumbo absolute -inset-[10px] opacity-50" />
    </div>
    <h1
      class="relative flex items-center text-5xl font-bold text-gray-800 dark:text-white dark:opacity-80 transition-colors"
    >
      Pic
      <span class="ml-1 rounded-xl bg-current p-2 text-[0.7em] leading-none">
        <span class="text-white dark:text-black">Manager</span>
      </span>
    </h1>
    <div class="mt-5">
      <ReButton ref="confettiButton" text="Upload" @click="handleView" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("@/style/css2.css");

body {
  font-family: Inter, sans-serif;
}

@keyframes jumbo {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }

  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}

@keyframes jumbo {
  from {
    background-position:
      50% 50%,
      50% 50%;
  }

  to {
    background-position:
      350% 50%,
      350% 50%;
  }
}

.jumbo {
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  --stripes-dark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 15%,
    #60a5fa 20%,
    #5eead4 25%,
    #60a5fa 30%
  );

  pointer-events: none;
  background-image: var(--stripes), var(--rainbow);
  filter: blur(10px) invert(100%);
  background-position:
    50% 50%,
    50% 50%;
  background-size: 300%, 200%;
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
}

.jumbo::after {
  position: absolute;
  inset: 0;
  content: "";
  background-image: var(--stripes), var(--rainbow);
  background-attachment: fixed;
  background-size: 200%, 100%;
  mix-blend-mode: difference;
  animation: jumbo 60s linear infinite;
}

.dark .jumbo {
  background-image: var(--stripes-dark), var(--rainbow);
  filter: blur(10px) opacity(50%) saturate(200%);
}

.dark .jumbo::after {
  background-image: var(--stripes-dark), var(--rainbow);
}
</style>
