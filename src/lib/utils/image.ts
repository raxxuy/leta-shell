import { CACHE_PICTURES_DIR } from "@/constants";
import { buildPath, fileExists } from "@/lib/utils/fs";
import { exec } from "@/lib/utils/shell";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
] as const;

export const isImageFile = (path: string): boolean => {
  const lower = path.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
};

export const extractImagePath = (
  path: string,
): { baseName: string; extension: string } => {
  const fileName = path.split("/").pop() || "";
  const lastDotIndex = fileName.lastIndexOf(".");
  const baseName = fileName.substring(0, lastDotIndex);
  const extension = fileName.substring(lastDotIndex);

  return {
    baseName,
    extension,
  };
};

export const scaleAndCenterImage = async (
  path: string,
  targetWidth: number,
  targetHeight: number,
): Promise<string | null> => {
  try {
    const { baseName, extension } = extractImagePath(path);
    const cachedFileName = `${baseName}_${targetWidth}x${targetHeight}${extension}`;
    const cachedPath = buildPath(CACHE_PICTURES_DIR, cachedFileName);

    if (fileExists(cachedPath)) {
      return cachedPath;
    }

    await exec([
      "convert",
      "-limit",
      "memory",
      "256MiB",
      "-limit",
      "map",
      "512MiB",
      path,
      "-resize",
      `${targetWidth}x${targetHeight}^`,
      "-gravity",
      "center",
      "-extent",
      `${targetWidth}x${targetHeight}`,
      cachedPath,
    ]);

    return cachedPath;
  } catch (error) {
    console.error(`Failed to scale image ${path}:`, error);
    return null;
  }
};
