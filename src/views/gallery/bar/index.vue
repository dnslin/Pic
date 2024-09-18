<template>
  <div class="bg-white dark:bg-custom-dark shadow-sm p-2 rounded-lg">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="item in visibleToolbarItems"
          :key="item.id"
          class="btn"
          :class="{ 'btn-primary': item.id === 'albums' }"
          @click="item.action"
        >
          <IconifyIconOnline :icon="item.icon" />
          <span>{{ item.label }}</span>
        </button>
        <div ref="dropdownRef" class="relative">
          <button class="btn" @click="toggleDropdown">
            <IconifyIconOnline icon="mdi:dots-vertical" />
            <span>{{ isSmallScreen ? "功能菜单" : "更多操作" }}</span>
          </button>
          <transition name="fade">
            <div v-if="isDropdownOpen" class="dropdown-menu">
              <button
                v-for="item in dropdownMenuItems"
                :key="item.id"
                class="dropdown-item"
                :class="{
                  'text-red-500 dark:text-red-400': item.id === 'delete'
                }"
                @click="item.action"
              >
                <IconifyIconOnline :icon="item.icon" />
                <span>{{ item.label }}</span>
              </button>
            </div>
          </transition>
        </div>
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        <div
          class="relative search-container"
          :class="{ 'is-expanded': isSearchExpanded }"
        >
          <input
            ref="searchInputRef"
            v-model="search"
            type="text"
            placeholder="搜索"
            class="input search-input w-full"
            @focus="handleSearchFocus"
            @blur="handleSearchBlur"
          />
          <IconifyIconOnline
            icon="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
        </div>
        <transition name="fade">
          <div
            v-if="!isSmallScreen || isSearchExpanded"
            class="flex items-center gap-2 w-full sm:w-auto transition-all duration-300 ease-in-out"
          >
            <select v-model="filter" class="select flex-grow sm:flex-grow-0">
              <option
                v-for="option in filterOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <select v-model="sort" class="select flex-grow sm:flex-grow-0">
              <option
                v-for="option in sortOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </transition>
        <button
          v-if="!isSearchExpanded"
          class="btn sm:hidden"
          @click="expandSearch"
        >
          <IconifyIconOnline icon="mdi:filter-variant" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  useWindowSize,
  useDropdown,
  useSearch,
  filterOptions,
  sortOptions,
  toolbarItems,
  dropdownItems
} from "./utils";

const { isSmallScreen, handleResize } = useWindowSize();
const { isDropdownOpen, dropdownRef, toggleDropdown, closeDropdown } =
  useDropdown();
const {
  search,
  isSearchExpanded,
  searchInputRef,
  expandSearch,
  handleSearchFocus,
  handleSearchBlur
} = useSearch(isSmallScreen);

const filter = ref(filterOptions[0].value);
const sort = ref(sortOptions[0].value);

const visibleToolbarItems = computed(() =>
  toolbarItems.filter(
    item => !isSmallScreen.value || ["albums", "add"].includes(item.id)
  )
);

const dropdownMenuItems = computed(() => [
  ...toolbarItems.filter(
    item => isSmallScreen.value && !["albums", "add"].includes(item.id)
  ),
  ...dropdownItems
]);

function test(actionName: string) {
  console.log(`Action triggered: ${actionName}`);
}

type ActionFunction = (actionName: string) => void;

interface Actions {
  [key: string]: ActionFunction;
}

const actions: Actions = {
  navigateToAlbums: test,
  addAlbum: test,
  reupload: test,
  setPermissions: test,
  share: test,
  showDetails: test,
  rename: test,
  deleteItems: test
};
onMounted(() => {
  document.addEventListener("click", closeDropdown);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.btn {
  @apply px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1 transition duration-200 ease-in-out;
}

.btn-primary {
  @apply bg-custom-mint text-white hover:bg-custom-mint/90 focus:ring-2 focus:ring-offset-2 focus:ring-custom-mint/50;
  @apply dark:bg-custom-mint/80 dark:hover:bg-custom-mint dark:focus:ring-custom-mint/30 dark:text-custom-dark;
}

.btn:not(.btn-primary) {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
  @apply dark:bg-custom-dark dark:text-gray-200 dark:hover:bg-gray-700;
}

.select {
  @apply bg-white border border-gray-300 rounded text-sm px-2 py-1.5;
  @apply dark:bg-custom-dark dark:border-gray-600 dark:text-gray-200;
}

.search-container {
  @apply relative overflow-hidden transition-all duration-300 ease-in-out;

  width: 200px; /* 默认宽度 */
}

.search-container.is-expanded {
  width: 300px; /* 展开后的宽度 */
}

.search-input {
  @apply pl-10 pr-3 py-2;
  @apply bg-gray-100 border border-gray-300 focus:border-custom-mint focus:ring-2 focus:ring-custom-mint/20 focus:outline-none;
  @apply dark:bg-custom-dark dark:border-gray-600 dark:text-gray-200 dark:focus:border-custom-mint/70 dark:focus:ring-custom-mint/10;
  @apply rounded-md text-sm;

  width: 100%;
  transition: background-color 0.3s ease-in-out;
}

.search-input:focus {
  @apply bg-white dark:bg-gray-800;
}

.dropdown-menu {
  @apply absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden;
  @apply border border-gray-200 dark:bg-custom-dark dark:border-gray-700;
}

.dropdown-item {
  @apply w-full text-left px-4 py-3 text-sm flex items-center gap-2 transition duration-150 ease-in-out;
  @apply hover:bg-gray-50 focus:bg-gray-50 focus:outline-none;
  @apply dark:text-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800;
}

.dropdown-item:not(:last-child) {
  @apply border-b border-gray-100 dark:border-gray-700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
