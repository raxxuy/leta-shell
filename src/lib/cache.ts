import { CACHE_DIR } from "@/constants";
import { buildPath, ensureDir } from "./fs";

export const cacheDir = (...segments: string[]): string => {
  const path = buildPath(CACHE_DIR, ...segments);
  ensureDir(path);
  return path;
};

export const initCache = (): void => {
  cacheDir();
};
