import { CACHE_DIR, WAL_DIR, WAL_FILE } from "@/constants";
import { ensureDir, fileExists, writeFile } from "@/lib/utils";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(WAL_DIR);

  if (!fileExists(WAL_FILE)) {
    writeFile(WAL_FILE, "");
  }
};
