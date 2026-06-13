import Gio from "gi://Gio";
import {
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
} from "@/constants";
import { buildPath, ensureDir, fileExists } from "../fs";
import { hashPath } from "../hash";

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

  return new Promise((resolve, reject) => {
    const proc = Gio.Subprocess.new(
      [
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
      ],
      Gio.SubprocessFlags.NONE,
    );

    proc.wait_async(null, (_, result) => {
      try {
        proc.wait_finish(result);
        resolve(file);
      } catch (e) {
        reject(e);
      }
    });
  });
};
