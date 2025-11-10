import { WAL_DIR } from "@/constants";
import { bash } from "@/lib/utils/shell";

export const generateColorSchemesByImage = (path: string) => {
  return bash(
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal -i '${path}' --out-dir '${WAL_DIR}' -n`,
  );
};

export const generateRandomColorSchemes = () => {
  return bash(
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal --theme random --out-dir '${WAL_DIR}' -n`,
  );
};
