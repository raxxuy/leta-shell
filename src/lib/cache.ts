import { CACHE_DIR, CACHE_PICTURES_DIR, CACHE_STYLES_DIR } from "@/constants";
import { ensureDir } from "@/utils";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(CACHE_STYLES_DIR);
  ensureDir(CACHE_PICTURES_DIR);
};
