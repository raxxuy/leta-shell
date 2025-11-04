import GLib from "gi://GLib";
import { readFile, writeFile } from "ags/file";
import { cacheDir } from "@/constants";

export const createCacheDir = () => {
  if (!GLib.file_test(cacheDir, GLib.FileTest.IS_DIR)) {
    GLib.mkdir_with_parents(cacheDir, 0o755);
    GLib.file_set_contents(`${cacheDir}/wallpaper`, "");
  }
};

export const useCache = (file: string) => {
  const filePath = `${cacheDir}/${file}`;
  return readFile(filePath);
};

export const setWallpaper = (wallpaper: string) => {
  const filePath = `${cacheDir}/wallpaper`;
  writeFile(filePath, wallpaper);
};
