import { ref, computed } from "vue";
import type { Ref } from "vue";
export interface ToolbarItem {
  id: string;
  icon: string;
  label: string;
  action: () => void;
  mobileOnly?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
}

export const useWindowSize = () => {
  const windowWidth = ref(window.innerWidth);
  const isSmallScreen = computed(() => windowWidth.value < 640);

  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  return { windowWidth, isSmallScreen, handleResize };
};
export const useSearch = (isSmallScreen: Ref<boolean>) => {
  const search = ref("");
  const isSearchExpanded = ref(false);
  const searchInputRef = ref<HTMLInputElement | null>(null);

  const expandSearch = () => {
    isSearchExpanded.value = true;
  };

  const contractSearch = () => {
    if (!search.value && !isSmallScreen.value) {
      isSearchExpanded.value = false;
    }
  };

  const handleSearchFocus = () => {
    expandSearch();
  };

  const handleSearchBlur = () => {
    contractSearch();
  };

  return {
    search,
    isSearchExpanded,
    searchInputRef,
    expandSearch,
    contractSearch,
    handleSearchFocus,
    handleSearchBlur
  };
};

export const useDropdown = () => {
  const isDropdownOpen = ref(false);
  const dropdownRef = ref<HTMLElement | null>(null);

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target as Node)
    ) {
      isDropdownOpen.value = false;
    }
  };

  return { isDropdownOpen, dropdownRef, toggleDropdown, closeDropdown };
};

export const filterOptions: FilterOption[] = [
  { value: "all", label: "全部" },
  { value: "favorited", label: "已收藏" },
  { value: "archived", label: "已归档" }
];

export const sortOptions: FilterOption[] = [
  { value: "time_asc", label: "时间升序" },
  { value: "time_desc", label: "时间降序" }
];

export const toolbarItems: ToolbarItem[] = [
  {
    id: "albums",
    icon: "mdi:album",
    label: "相册",
    action: () => console.log("Navigate to albums")
  },
  {
    id: "add",
    icon: "mdi:plus",
    label: "添加相册",
    action: () => console.log("Add album")
  },
  {
    id: "reupload",
    icon: "mdi:upload",
    label: "重新上传",
    action: () => console.log("Reupload")
  },
  {
    id: "permissions",
    icon: "mdi:lock",
    label: "设置权限",
    action: () => console.log("Set permissions")
  }
];

export const dropdownItems: ToolbarItem[] = [
  {
    id: "share",
    icon: "mdi:share",
    label: "分享",
    action: () => console.log("Share")
  },
  {
    id: "details",
    icon: "mdi:information",
    label: "详细信息",
    action: () => console.log("Show details")
  },
  {
    id: "rename",
    icon: "mdi:pencil",
    label: "重命名",
    action: () => console.log("Rename")
  },
  {
    id: "delete",
    icon: "mdi:delete",
    label: "删除",
    action: () => console.log("Delete items")
  }
];
