import {
  CACHE_DIR,
  CACHE_SCSS_DIR,
  CACHE_WALLPAPERS_DIR,
  CACHE_WALLPAPERS_ORIGINAL_DIR,
  CACHE_WALLPAPERS_RENDERED_DIR,
} from "@/constants";
import { ensureDir } from "@/lib/fs";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(CACHE_SCSS_DIR);
  ensureDir(CACHE_WALLPAPERS_DIR);
  ensureDir(CACHE_WALLPAPERS_ORIGINAL_DIR);
  ensureDir(CACHE_WALLPAPERS_RENDERED_DIR);
};
