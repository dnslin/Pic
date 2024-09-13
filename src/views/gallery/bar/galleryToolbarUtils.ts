import { ref, computed } from "vue";
import type { Ref } from "vue";

export interface ToolbarItem {
  id: string;
  icon: string;
  label: string;
  actionName: string;
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
    actionName: "navigateToAlbums"
  },
  {
    id: "add",
    icon: "mdi:plus",
    label: "添加相册",
    actionName: "addAlbum"
  },
  {
    id: "reupload",
    icon: "mdi:upload",
    label: "重新上传",
    actionName: "reupload"
  },
  {
    id: "permissions",
    icon: "mdi:lock",
    label: "设置权限",
    actionName: "setPermissions"
  }
];

export const dropdownItems: ToolbarItem[] = [
  {
    id: "share",
    icon: "mdi:share",
    label: "分享",
    actionName: "share"
  },
  {
    id: "details",
    icon: "mdi:information",
    label: "详细信息",
    actionName: "showDetails"
  },
  {
    id: "rename",
    icon: "mdi:pencil",
    label: "重命名",
    actionName: "rename"
  },
  {
    id: "delete",
    icon: "mdi:delete",
    label: "删除",
    actionName: "deleteItems"
  }
];
