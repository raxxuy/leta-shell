import {
  CACHE_DIR,
  CACHE_PICTURES_DIR,
  CACHE_WAL_DIR,
  WAL_FILE,
} from "@/constants";
import { ensureDir, fileExists, writeFile } from "./utils";

export const initCache = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(CACHE_WAL_DIR);
  ensureDir(CACHE_PICTURES_DIR);

  if (!fileExists(WAL_FILE)) {
    writeFile(WAL_FILE, "");
  }
};
