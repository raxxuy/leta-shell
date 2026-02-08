import { last } from "es-toolkit";
import { CACHE_PICTURES_DIR, SRC_MATUGEN_DIR } from "@/constants";
import { buildPath, ensureDir, exec, fileExists, readDir } from ".";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
] as const;

export const isImageFile = (path: string) =>
  IMAGE_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext));

export const extractImagePath = (path: string) => {
  const fileName = last(path.split("/")) || "";
  const lastDotIndex = fileName.lastIndexOf(".");

  return {
    baseName: fileName.substring(0, lastDotIndex),
    extension: fileName.substring(lastDotIndex),
  };
};

export const getCachedImagePath = (
  path: string,
  width: number,
  height: number,
) => {
  const { baseName, extension } = extractImagePath(path);

  return buildPath(
    CACHE_PICTURES_DIR,
    `${baseName}_${width}x${height}${extension}`,
  );
};

export const scaleAndCenterImage = async (
  path: string,
  width: number,
  height: number,
  outputPath?: string,
  force = false,
): Promise<string | null> => {
  const cachedPath = outputPath || getCachedImagePath(path, width, height);

  if (!force && fileExists(cachedPath)) return cachedPath;

  try {
    if (outputPath) {
      // Ensure output directory exists for custom paths
      const outputDir = outputPath.substring(0, outputPath.lastIndexOf("/"));
      ensureDir(outputDir);
    } else {
      ensureDir(CACHE_PICTURES_DIR);
    }

    await exec([
      "magick",
      "-limit memory 256MiB",
      "-limit map 512MiB",
      path,
      "-resize",
      `${width}x${height}^`,
      "-gravity center",
      "-extent",
      `${width}x${height}`,
      cachedPath,
    ]);

    return cachedPath;
  } catch (error) {
    console.error(`Failed to scale image ${path}:`, error);
    return null;
  }
};

export const cleanupOrphanedCache = async (
  validPictures: string[],
  width: number,
  height: number,
) => {
  try {
    const validCachePaths = new Set(
      validPictures.map((pic) => getCachedImagePath(pic, width, height)),
    );

    const cachedFiles = await readDir(CACHE_PICTURES_DIR);
    const orphaned = cachedFiles
      .map((file) => buildPath(CACHE_PICTURES_DIR, file))
      .filter((path) => !validCachePaths.has(path));

    if (orphaned.length > 0) {
      await Promise.all(orphaned.map((path) => exec(`rm -rf ${path}`)));
      console.log(`🗑️  Cleaned up ${orphaned.length} orphaned cache files`);
    }
  } catch (error) {
    console.error("Failed to cleanup orphaned cache:", error);
  }
};

export const generateColors = async (path?: string) => {
  const args = path ? `image ${path}` : "color hex '#000000'";

  try {
    await exec(
      `matugen ${args} --mode dark --config ${SRC_MATUGEN_DIR}/config.toml --source-color-index 0`,
    );
  } catch (error) {
    console.error("Failed to generate colors:", error);
  }
};
