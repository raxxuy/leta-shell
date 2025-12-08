import { WAL_DIR } from "@/constants";
import { exec } from "@/lib/utils";

export const generateColors = async (path?: string): Promise<void> => {
  const args = path ? `-i '${path}'` : "--theme random";

  await exec(
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal ${args} --out-dir '${WAL_DIR}' -n`,
  );
};
