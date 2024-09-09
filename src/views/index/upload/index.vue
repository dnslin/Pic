<script setup lang="ts">
import { ref, computed } from "vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { useColumns } from "./columns";
import Delete from "@iconify-icons/ep/delete";
import Upload from "@iconify-icons/ep/upload";
import View from "@iconify-icons/ep/view";
import { message } from "@/utils/message";
import {
  useUploadLogic,
  type FileStatus,
  type LinkTypes
} from "./useUploadLogic";
defineOptions({
  name: "UploadIndex"
});

const { columns } = useColumns();
const {
  tableData,
  isBottom,
  load,
  processFiles,
  handleDelete,
  handleUpload,
  removeAll,
  getTagType,
  getLinks,
  getAllLinksOfType,
  hasUploadedImages
} = useUploadLogic();

const activeTab = ref("original");
const show = ref(false);
const allLinksMode = ref(false);
const dialogVisible = ref(false);
const fileInput = ref(null);
const currentLinks = ref<LinkTypes | null>(null);
function triggerFileInput() {
  fileInput.value.click();
}

function handleDrop(event) {
  event.preventDefault();
  processFiles(event.dataTransfer.files);
}

function handleFileChange(event) {
  processFiles(event.target.files);
}

function triggerFileInputs() {
  console.log("上传全部");
}

function handleView(row) {
  const links = getLinks(row);
  if (links) {
    currentLinks.value = links;
    allLinksMode.value = false;
    dialogVisible.value = true;
  } else {
    message("链接信息不可用", { type: "warning" });
  }
}
// 复制到剪切板
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    () => {
      message("已复制到剪贴板", { type: "success" });
    },
    () => {
      message("复制失败，请手动复制", { type: "error" });
    }
  );
}
// 查看所有链接
function handleViewAllLinks() {
  allLinksMode.value = true;
  dialogVisible.value = true;
}

const linkTypes = computed(() =>
  allLinksMode.value
    ? ["original", "markdown", "bbcode", "html", "thumbnail"]
    : Object.keys(currentLinks.value || {})
);

function getLinkContent(type: string) {
  return allLinksMode.value
    ? getAllLinksOfType(type as keyof LinkTypes)
    : currentLinks.value?.[type as keyof LinkTypes] || "";
}
</script>

<template>
  <div
    class="h-full flex mx-auto container px-5 sm:px-10 md:px-10 lg:px-10 xl:px-10 2xl:px-60"
  >
    <input
      id="picker"
      ref="fileInput"
      type="file"
      name="file"
      class="hidden"
      accept=".jpeg,.jpg,.png,.gif,.tif,.bmp,.ico,.psd,.webp"
      multiple
      @change="handleFileChange"
    />
    <div
      class="p-4 bg-white rounded-md shadow-custom w-full dark:text-white dark:bg-bg_color"
      style="margin-bottom: 20px"
    >
      <h1
        class="tracking-wider text-2xl text-gray-700 mb-2 animate__bounceIn dark:text-white"
        style="text-shadow: -4px 4px 0 rgb(0 0 0 / 10%)"
      >
        Image Upload
      </h1>
      <p class="text-gray-500 text-sm">
        最大可上传 5.00 MB 的图片，上传队列最多 3 张。本站已托管 0 张图片。
      </p>
      <div
        id="picker-dnd"
        class="mt-3 rounded-md border-2 border-dotted border-stone-300 dark:bg-bg_color"
        @click="triggerFileInput"
        @dragover.prevent
        @drop="handleDrop"
        @mouseenter="show = true"
        @mouseleave="show = false"
      >
        <div
          class="relative group flex flex-col justify-center items-center p-2 min-h-[150px] sm:min-h-[300px] text-gray-500 cursor-pointer"
        >
          <IconifyIconOnline
            v-if="show"
            icon="typcn:times"
            width="32px"
            height="32px"
            class="absolute top-1 right-1 flex justify-center items-center cursor-pointer text-xl text-center animate__animated animate__fadeIn"
            style="color: #9baaa1"
            @click.stop="removeAll"
          />
          <p id="upload-all" title="点我上传全部">
            <!-- 图标 -->
            <IconifyIconOnline
              icon="line-md:upload-outline-loop"
              width="70px"
              height="70px"
              style="color: #52ffbd"
              @click.stop="triggerFileInputs"
            />
          </p>
          <p
            class="text-md text-center animate__animated animate__fadeIn animate__delay-1s"
          >
            拖拽文件到这里，支持多文件同时上传<br />点击上面的图标上传全部已选择文件
          </p>
        </div>
      </div>
      <pure-table
        v-show="tableData.length > 0"
        v-el-table-infinite-scroll="load"
        :infinite-scroll-disabled="isBottom"
        table-layout="auto"
        class="mt-4 animate__animated animate__fadeInUp"
        :data="tableData"
        :columns="columns"
        max-height="400"
      >
        <template #image="{ row, index }">
          <el-image
            preview-teleported
            loading="lazy"
            :src="row.image"
            :preview-src-list="tableData.map(v => v.image)"
            :initial-index="index"
            fit="cover"
            max-height="420px"
            class="w-[80px] h-[80px] rounded"
          />
        </template>
        <template #status="{ row }">
          <el-tag
            :type="getTagType(row.status as FileStatus)"
            :closable="false"
            size="large"
            disabled="disabled"
          >
            {{ row.status }}
          </el-tag>
        </template>
        <template #operation="{ row }">
          <!-- <div class="flex flex-col items-center justify-center space-y-1"> -->
          <div
            class="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2"
          >
            <el-button
              v-if="row.status === '成功'"
              link
              type="primary"
              :icon="useRenderIcon(View)"
              class="animate__animated animate__fadeIn"
              @click="handleView(row)"
            >
              查看
            </el-button>
            <el-button
              v-else
              link
              type="primary"
              :icon="useRenderIcon(Upload)"
              class="animate__animated animate__fadeIn"
              @click="handleUpload(row)"
            >
              上传
            </el-button>
            <el-button
              link
              type="primary"
              style="margin: 0"
              class="animate__animated animate__fadeIn"
              :icon="useRenderIcon(Delete)"
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </pure-table>
      <div v-if="tableData.length" class="mt-4">
        <el-button
          type="primary"
          class="animate__animated animate__bounceIn"
          :disabled="!hasUploadedImages"
          @click="handleViewAllLinks"
          >查看所有图片链接</el-button
        >
      </div>
      <el-dialog
        v-model="dialogVisible"
        :title="allLinksMode ? '所有图片链接' : '图片链接'"
        width="90%"
        class="max-w-3xl animate__animated animate__zoomIn"
      >
        <el-tabs v-model="activeTab" class="w-full">
          <el-tab-pane
            v-for="key in linkTypes"
            :key="key"
            :label="key"
            :name="key"
          >
            <div class="bg-gray-100 dark:bg-gray-800 rounded-md p-4">
              <pre
                class="whitespace-pre-wrap break-words text-sm font-mono text-gray-800 dark:text-gray-200"
                >{{ getLinkContent(key) }}</pre
              >
            </div>
            <el-button
              class="mt-4"
              type="primary"
              @click="copyToClipboard(getLinkContent(key))"
            >
              复制
            </el-button>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (width <= 640px) {
  .el-dialog {
    @apply w-full max-w-none m-0 h-full;
  }
}
</style>
