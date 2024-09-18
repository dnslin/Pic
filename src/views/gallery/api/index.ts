import axios from "axios";

export interface ImageItem {
  id: string;
  src: string;
  type: string;
  aspectRatio: number;
}

const api = axios.create({
  baseURL: "https://api.vvhan.com/api",
  timeout: 10000
});

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function getImageWithAspectRatio(data: any): Promise<ImageItem> {
  const img = await loadImage(data.url);
  return {
    id: Date.now().toString(),
    src: data.url,
    type: data.type,
    aspectRatio: img.width / img.height
  };
}

async function fetchSingleImage(): Promise<ImageItem> {
  const response = await api.get("/wallpaper/views", {
    params: { type: "json" }
  });
  const data = response.data;
  if (data.success) {
    return await getImageWithAspectRatio(data);
  }
  throw new Error("Failed to fetch image");
}

export async function fetchImages(perPage: number = 40): Promise<ImageItem[]> {
  try {
    const promises = Array(perPage)
      .fill(null)
      .map(() => fetchSingleImage());
    const images = await Promise.all(promises);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}
