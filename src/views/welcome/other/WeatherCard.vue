<template>
  <div
    class="bg-white w-full sm:w-[90%] md:w-[500px] flex flex-col sm:flex-row items-center justify-between rounded-[15px] p-4 sm:p-6 shadow-md hover:shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer"
  >
    <div class="card__info text-center sm:text-left mb-2 sm:mb-0">
      <p class="text-sm text-[#2F2F31]">{{ currentPlace }}</p>
      <p class="text-2xl sm:text-3xl text-[#22215B]">{{ currentTime }}</p>
      <p class="text-xs sm:text-sm text-[#2F2F31]">{{ currentDate }}</p>
    </div>
    <div class="flex items-center gap-3">
      <Icon
        :icon="weatherIcon"
        class="text-[#567DF4] w-[40px] h-[40px] sm:w-[40px] sm:h-[40px] animate-bounce"
      />
      <p class="text-2xl sm:text-3xl">{{ temperature }}° C</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  place: {
    type: String,
    default: "中山"
  },
  temperature: Number,
  weather: String
});

const currentPlace = computed(() => {
  return props.place;
});

const currentTime = computed(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "下午" : "上午";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
});

const currentDate = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  const weekday = weekdays[now.getDay()];
  return `${year}年${month}月${day}日 | ${weekday}`;
});

const weatherIcon = computed(() => {
  switch (props.weather) {
    case "sunny":
      return "mdi:weather-sunny";
    case "cloudy":
      return "mdi:weather-cloudy";
    case "rainy":
      return "mdi:weather-rainy";
    case "snowy":
      return "mdi:weather-snowy";
    default:
      return "mdi:weather-cloudy";
  }
});
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-6%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 0.8s infinite;
}
</style>
