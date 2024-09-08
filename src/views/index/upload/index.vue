<script setup lang="ts">
defineOptions({
  name: "UploadIndex"
});
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
      >
        <div
          class="relative group flex flex-col justify-center items-center p-2 min-h-[150px] sm:min-h-[300px] text-gray-500 cursor-pointer"
        >
          <IconifyIconOnline
            icon="typcn:times"
            width="32px"
            height="32px"
            class="absolute top-1 right-1 flex justify-center items-center cursor-pointer text-xl text-center"
            style="color: #9baaa1"
          />
          <p id="upload-all" title="点我上传全部">
            <!-- 图标 -->
            <IconifyIconOnline
              icon="line-md:upload-outline-loop"
              width="70px"
              height="70px"
              style="color: #52ffbd"
            />
          </p>
          <p class="text-md text-center">
            拖拽文件到这里，支持多文件同时上传<br />点击上面的图标上传全部已选择文件
          </p>
        </div>
      </div>
      <pure-table table-layout="auto" class="mt-4" max-height="400">
        <template #image="{ row, index }">
          <el-image
            preview-teleported
            loading="lazy"
            :src="row.image"
            :initial-index="index"
            fit="cover"
            max-height="420px"
            class="w-[80px] h-[80px] rounded"
          />
        </template>
        <template #status="{ row }">
          <el-tag :closable="false" size="large" disabled="disabled">
            {{ row.status }}
          </el-tag>
        </template>
        <template #operation="{ row }">
          <div class="flex flex-col items-center justify-center space-y-1">
            <el-button v-if="row.status === '成功'" link type="primary">
              查看
            </el-button>
            <el-button v-else link type="primary"> 上传 </el-button>
            <el-button link type="primary" style="margin: 0"> 删除 </el-button>
          </div>
        </template>
      </pure-table>
    </div>
  </div>
</template>
