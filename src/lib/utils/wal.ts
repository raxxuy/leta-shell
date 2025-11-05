import { execAsync } from "ags/process";
import { walDir } from "@/constants";

export const generateColorSchemesByImage = (image: string) => {
  return execAsync([
    "bash",
    "-c",
    `env PYWAL_CACHE_DIR='${walDir}' wal -i '${image}' --out-dir '${walDir}'`,
  ]);
};

export const generateRandomColorSchemes = () => {
  return execAsync([
    "bash",
    "-c",
    `env PYWAL_CACHE_DIR='${walDir}' wal --theme random --out-dir '${walDir}'`,
  ]);
};
