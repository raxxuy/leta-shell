import { last } from "es-toolkit";
import { CACHE_PICTURES_DIR, CACHE_WAL_DIR } from "@/constants";
import { buildPath, exec, fileExists } from "@/lib/utils";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
] as const;

export const isImageFile = (path: string): boolean =>
  IMAGE_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext));

export const extractImagePath = (path: string) => {
  const fileName = last(path.split("/")) || "";
  const lastDotIndex = fileName.lastIndexOf(".");

  return {
    baseName: fileName.substring(0, lastDotIndex),
    extension: fileName.substring(lastDotIndex),
  };
};

export const scaleAndCenterImage = async (
  path: string,
  targetWidth: number,
  targetHeight: number,
): Promise<string | null> => {
  try {
    const { baseName, extension } = extractImagePath(path);
    const cachedPath = buildPath(
      CACHE_PICTURES_DIR,
      `${baseName}_${targetWidth}x${targetHeight}${extension}`,
    );

    if (fileExists(cachedPath)) return cachedPath;

    await exec([
      "convert",
      "-limit memory 256MiB",
      "-limit map 512MiB",
      path,
      "-resize",
      `${targetWidth}x${targetHeight}^`,
      "-gravity center",
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

export const generateColors = async (path?: string): Promise<void> => {
  const args = path ? ["-i", path] : ["--theme", "random"];

  await exec([
    "env",
    `PYWAL_CACHE_DIR=${CACHE_WAL_DIR}`,
    "wal",
    ...args,
    "--out-dir",
    CACHE_WAL_DIR,
    "-n",
    "--backend wal",
  ]);
};
