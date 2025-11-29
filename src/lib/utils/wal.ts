import { WAL_DIR } from "@/constants";
import { exec } from "@/lib/utils/shell";

const runWal = (args: string): Promise<string> =>
  exec(
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal ${args} --out-dir '${WAL_DIR}' -n`,
  );

export const generateFromImage = (imagePath: string): Promise<string> =>
  runWal(`-i '${imagePath}'`);

export const generateRandom = (): Promise<string> => runWal("--theme random");
