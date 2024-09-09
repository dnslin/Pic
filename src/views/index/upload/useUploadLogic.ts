import { ref, computed } from "vue";
import { message } from "@/utils/message";
import CryptoJS from "crypto-js";
import { ElMessageBox } from "element-plus";

// 类型定义
type TagType = "success" | "warning" | "info" | "primary" | "danger";
type FileStatus = "上传中" | "成功" | "失败";

// 表单类型
interface TableItem {
  index: number;
  image: string;
  fileName: string;
  fileSize: string;
  md5: string;
  status: FileStatus;
  file: File;
  links?: LinkTypes;
}

//
interface LinkTypes {
  original: string;
  markdown: string;
  bbcode: string;
  html: string;
  thumbnail: string;
  delUrl: string;
}

// 常量
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "jpeg",
  "jpg",
  "png",
  "gif",
  "tif",
  "bmp",
  "ico",
  "psd",
  "webp"
];

// 自定义错误类
class FileProcessingError extends Error {
  constructor(
    message: string,
    public fileName: string
  ) {
    super(message);
    this.name = "FileProcessingError";
  }
}

export function useUploadLogic() {
  const tableData = ref<TableItem[]>([]);
  const page = ref(0);
  const total = ref(10);
  const isBottom = ref(false);

  const data = computed(() => {
    const start = 0;
    const end = (page.value + 1) * 10;
    return tableData.value.slice(start, end);
  });

  const load = () => {
    if (isBottom.value) return;
    page.value++;
    if (page.value === total.value) {
      isBottom.value = true;
    }
  };

  const memoizedIsValidFileType = (() => {
    const cache = new Map<string, boolean>();
    return (file: File) => {
      const fileType = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (cache.has(fileType)) {
        return cache.get(fileType)!;
      }
      const isValid = ALLOWED_FILE_TYPES.includes(fileType);
      cache.set(fileType, isValid);
      return isValid;
    };
  })();

  function isValidFileSize(file: File): boolean {
    return file.size <= MAX_FILE_SIZE;
  }

  function readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(
          new FileProcessingError(
            reader.error?.message ?? "Unknown error",
            file.name
          )
        );
      reader.readAsDataURL(file);
    });
  }

  async function computeMD5(data: string): Promise<string> {
    return CryptoJS.MD5(data).toString();
  }

  async function addToTableData(
    file: File,
    base64: string,
    uploadStatus: FileStatus
  ) {
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + " MB";
    const md5 = await computeMD5(base64);

    const isDuplicate = tableData.value.some(
      item => item.fileName === fileName && item.md5 === md5
    );
    if (isDuplicate) {
      console.log(`文件 "${fileName}" (MD5: ${md5}) 已存在，将被忽略。`);
      return;
    }

    const index = tableData.value.length;
    tableData.value.push({
      index,
      image: base64,
      fileName,
      fileSize,
      md5,
      status: uploadStatus,
      file
    });
  }

  async function processFiles(files: FileList) {
    const validFiles = Array.from(files).filter(
      file => memoizedIsValidFileType(file) && isValidFileSize(file)
    );
    for (const file of validFiles) {
      try {
        const base64 = await readFileAsBase64(file);
        await addToTableData(file, base64, "上传中");
      } catch (error) {
        if (error instanceof FileProcessingError) {
          message(`读取文件${error.fileName}时发生错误: ${error.message}`, {
            type: "error"
          });
        } else {
          message(`处理文件时发生未知错误`, { type: "error" });
        }
      }
    }
  }

  function handleDelete(row: TableItem) {
    const index = tableData.value.findIndex(v => v.md5 === row.md5);
    if (index !== -1) {
      tableData.value.splice(index, 1);
    }
  }

  async function handleUpload(row: TableItem) {
    const index = tableData.value.findIndex(v => v.index === row.index);
    if (index !== -1) {
      const originalUrl = `https://example.com/images/${row.md5}`;
      const thumbnailUrl = `https://example.com/thumbnails/${row.md5}`;

      tableData.value[index].status = "成功";
      tableData.value[index].links = generateLinks(originalUrl, thumbnailUrl);
    }
  }

  function getLinks(row: TableItem): LinkTypes | undefined {
    return row.links;
  }

  function removeAll() {
    tableData.value = [];
  }

  function getTagType(status: FileStatus): TagType {
    switch (status) {
      case "上传中":
        return "primary";
      case "成功":
        return "success";
      case "失败":
        return "danger";
      default:
        return "info";
    }
  }

  const handleClose = async (done: () => void) => {
    if (tableData.value.length > 0) {
      try {
        await ElMessageBox.confirm("是否清空上传列表?");
        removeAll();
      } catch {
        // 用户取消或关闭对话框，不执行操作
      }
    }
    done();
  };
  // 构造不同的URL
  function generateLinks(originalUrl: string, thumbnailUrl: string): LinkTypes {
    return {
      original: originalUrl,
      markdown: `![image](${originalUrl})`,
      bbcode: `[img]${originalUrl}[/img]`,
      html: `<img src="${originalUrl}" alt="image" />`,
      thumbnail: thumbnailUrl,
      delUrl: "暂无"
    };
  }
  function getAllLinksOfType(type: keyof LinkTypes): string {
    return tableData.value
      .filter(item => item.status === "成功" && item.links)
      .map(item => item.links![type])
      .join("\n");
  }
  const hasUploadedImages = computed(() => {
    return tableData.value.some(item => item.status === "成功" && item.links);
  });
  return {
    tableData,
    data,
    page,
    total,
    isBottom,
    load,
    processFiles,
    handleDelete,
    handleUpload,
    removeAll,
    getTagType,
    handleClose,
    getLinks,
    getAllLinksOfType,
    hasUploadedImages
  };
}

export type { FileStatus, LinkTypes };
