<template>
  <div class="button-container">
    <button ref="button" class="button" @click="triggerConfetti">
      <span v-if="icon" class="icon">{{ icon }}</span>
      <span class="text text-black dark:text-white">{{ text }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import confetti from "canvas-confetti";

interface Props {
  text?: string;
  icon?: string;
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  scalar?: number;
  ticks?: number;
}

const props = withDefaults(defineProps<Props>(), {
  text: "Like",
  icon: "🎉",
  particleCount: 50,
  spread: 30,
  startVelocity: 20,
  scalar: 0.7,
  ticks: 50
});

const button = ref<HTMLButtonElement | null>(null);

const triggerConfetti = () => {
  if (!button.value) return;

  const rect = button.value.getBoundingClientRect();
  const buttonCenterX = rect.left + rect.width / 2;
  const buttonCenterY = rect.top + rect.height / 2;

  const x = buttonCenterX / window.innerWidth;
  const y = buttonCenterY / window.innerHeight;

  confetti({
    particleCount: props.particleCount,
    spread: props.spread,
    origin: { x, y },
    startVelocity: props.startVelocity,
    scalar: props.scalar,
    ticks: props.ticks
  });
};

defineExpose({
  triggerConfetti
});
</script>

<style scoped lang="scss">
.button-container {
  @apply inline-block;
}

.button {
  @apply bg-transparent text-black dark:text-white border-0 text-base font-normal py-2 px-3 rounded-md z-[999] relative flex items-center gap-1 cursor-pointer transition-all duration-300;

  box-shadow:
    0 1.7px 2.2px rgb(0 0 0 / 2%),
    0 4px 5.3px rgb(0 0 0 / 2.8%),
    0 7.5px 10px rgb(0 0 0 / 3.5%),
    0 13.4px 17.9px rgb(0 0 0 / 4.2%),
    0 25.1px 33.4px rgb(0 0 0 / 5%),
    0 60px 80px rgb(0 0 0 / 7%);
}

.dark .button {
  box-shadow:
    0 1.7px 2.2px rgb(255 255 255 / 2%),
    0 4px 5.3px rgb(255 255 255 / 2.8%),
    0 7.5px 10px rgb(255 255 255 / 3.5%),
    0 13.4px 17.9px rgb(255 255 255 / 4.2%),
    0 25.1px 33.4px rgb(255 255 255 / 5%),
    0 60px 80px rgb(255 255 255 / 7%),
    0 0 15px rgb(255 255 255 / 20%); /* 添加白色晕光 */
}

.button:active {
  @apply transform scale-[1.01];
}

.dark .button:hover {
  box-shadow:
    0 1.7px 2.2px rgb(255 255 255 / 3%),
    0 4px 5.3px rgb(255 255 255 / 3.8%),
    0 7.5px 10px rgb(255 255 255 / 4.5%),
    0 13.4px 17.9px rgb(255 255 255 / 5.2%),
    0 25.1px 33.4px rgb(255 255 255 / 6%),
    0 60px 80px rgb(255 255 255 / 8%),
    0 0 20px rgb(255 255 255 / 30%); /* 增强悬停时的晕光效果 */
}

.icon,
.text {
  @apply inline-flex items-center leading-none;
}

.icon {
  @apply text-[1.2em];
}
</style>
