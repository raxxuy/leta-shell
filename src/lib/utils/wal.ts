import { execAsync } from "ags/process";
import { WAL_DIR } from "@/constants";

export const generateColorSchemesByImage = (image: string) => {
  return execAsync([
    "bash",
    "-c",
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal -i '${image}' --out-dir '${WAL_DIR}'`,
  ]);
};

export const generateRandomColorSchemes = () => {
  return execAsync([
    "bash",
    "-c",
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal --theme random --out-dir '${WAL_DIR}'`,
  ]);
};
