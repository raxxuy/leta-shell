import {
  CACHE_COLORS_FILE,
  CACHE_DIR,
  CACHE_SCSS_DIR,
  CACHE_THEMES_DIR,
  CACHE_WALLPAPERS_DIR,
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
  SRC_COLORS_FILE,
} from "@/constants";
import { ensureDir, fileExists, readFile, writeFile } from "../fs";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(CACHE_SCSS_DIR);
  ensureDir(CACHE_THEMES_DIR);
  ensureDir(CACHE_WALLPAPERS_DIR);
  ensureDir(CACHE_WALLPAPERS_ORIGINAL_DIR);
  ensureDir(CACHE_WALLPAPERS_RENDERED_DIR);

  if (!fileExists(CACHE_COLORS_FILE)) {
    writeFile(CACHE_COLORS_FILE, readFile(SRC_COLORS_FILE) ?? "");
  }
};
