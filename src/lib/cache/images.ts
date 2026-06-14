import Gio from "gi://Gio";
import {
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
} from "@/constants";
import { buildPath, ensureDir, fileExists } from "../fs";
import { hashPath } from "../hash";
import { exec } from "../process";

export const renderImage = async (
  path: string,
  w: number,
  h: number,
): Promise<string | null> => {
  const hash = hashPath(path);
  if (!hash) return null;

  const originalFile = Gio.File.new_for_path(
    buildPath(CACHE_WALLPAPERS_ORIGINAL_DIR, hash),
  );
  if (!originalFile.query_exists(null)) {
    originalFile.make_symbolic_link(path, null);
  }

  const resDir = buildPath(CACHE_WALLPAPERS_RENDERED_DIR, `${w}x${h}`);
  ensureDir(resDir);

  const file = buildPath(resDir, `${hash}.png`);
  if (fileExists(file)) return file;

  try {
    await exec([
      "leta-toolkit",
      "image",
      "cover",
      "--input",
      path,
      "--output",
      file,
      "--width",
      String(w),
      "--height",
      String(h),
    ]);
    return file;
  } catch {
    return null;
  }
};
