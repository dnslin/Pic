<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [
      { id: 1, title: "图片 1", imageUrl: "/api/placeholder/450/600" },
      { id: 2, title: "图片 2", imageUrl: "/api/placeholder/450/600" },
      { id: 3, title: "图片 3", imageUrl: "/api/placeholder/450/600" },
      { id: 4, title: "图片 4", imageUrl: "/api/placeholder/450/600" },
      { id: 5, title: "图片 5", imageUrl: "/api/placeholder/450/600" }
    ]
  }
});

const active = ref(2);
const count = computed(() => props.cards.length);

const setActive = index => {
  active.value = index;
};

const next = () => {
  setActive((active.value + 1) % count.value);
};

const prev = () => {
  setActive((active.value - 1 + count.value) % count.value);
};

const autoplay = ref(null);

const startAutoplay = () => {
  autoplay.value = setInterval(next, 5000);
};

const stopAutoplay = () => {
  if (autoplay.value) {
    clearInterval(autoplay.value);
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="relative w-full h-full overflow-hidden">
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="relative w-full max-w-[16rem] md:max-w-[16rem] aspect-[2/3] carousel"
      >
        <TransitionGroup name="carousel">
          <div
            v-for="(card, index) in cards"
            :key="card.id"
            class="card-container"
            :style="{
              '--offset': (active - index) / 3,
              '--abs-offset': Math.abs(active - index) / 3,
              'pointer-events': active === index ? 'auto' : 'none',
              opacity: Math.abs(active - index) >= 3 ? '0' : '1',
              display: Math.abs(active - index) > 3 ? 'none' : 'block'
            }"
          >
            <div class="card">
              <img
                :src="card.imageUrl"
                :alt="card.title"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
              >
                <h2 class="text-sm font-bold truncate">{{ card.title }}</h2>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
    <button
      class="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out"
      @click="prev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 md:h-6 md:w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      class="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-1 md:p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out"
      @click="next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 md:h-6 md:w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.carousel {
  perspective: 400px;
  transform-style: preserve-3d;
}

.card-container {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(calc(var(--abs-offset) * 0.5rem));
  transition: all 0.3s ease-out;
  transform: rotateY(calc(var(--offset) * 50deg))
    scaleY(calc(1 + var(--abs-offset) * -0.4))
    translateZ(calc(var(--abs-offset) * -20rem))
    translateX(calc(var(--offset) * -3rem));
}

.card {
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  color: #9ca3af;
  text-align: justify;
  background-color: hsl(280deg 40% calc(100% - var(--abs-offset) * 50%));
  border-radius: 0.5rem;
  transition: all 0.3s ease-out;
}

.card h2 {
  opacity: var(--active);
  transition: all 0.3s ease-out;
}

.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.3s ease-out;
}

.carousel-enter-from {
  opacity: 0;
  transform: rotateY(-50deg) scaleY(0.6) translateZ(-20rem) translateX(3rem);
}

.carousel-leave-to {
  opacity: 0;
  transform: rotateY(50deg) scaleY(0.6) translateZ(-20rem) translateX(-3rem);
}

@media (width <= 768px) {
  .carousel {
    perspective: 200px;
  }

  .card-container {
    transform: rotateY(calc(var(--offset) * 25deg))
      scaleY(calc(1 + var(--abs-offset) * -0.2))
      translateZ(calc(var(--abs-offset) * -10rem))
      translateX(calc(var(--offset) * -1.5rem));
  }

  .carousel-enter-from {
    transform: rotateY(-25deg) scaleY(0.8) translateZ(-10rem) translateX(1.5rem);
  }

  .carousel-leave-to {
    transform: rotateY(25deg) scaleY(0.8) translateZ(-10rem) translateX(-1.5rem);
  }
}
</style>
