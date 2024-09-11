<script setup lang="ts">
import { ref } from "vue";

interface Props {
  message: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: ""
});

const emit = defineEmits(["close"]);

const isVisible = ref(true);

const closeAnnouncement = () => {
  isVisible.value = false;
  emit("close");
};
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="isVisible"
      class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded shadow-md relative"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          class="w-6 h-6 mr-2 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="font-medium text-sm sm:text-base">{{ message }}</p>
      </div>
      <button
        class="absolute top-0 right-0 p-2 text-green-600 hover:text-green-800 focus:outline-none bg-transparent"
        @click="closeAnnouncement"
      >
        <svg
          class="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </Transition>
</template>
