import { WAL_DIR } from "@/constants";
import { bash } from "@/lib/utils/shell";

const walCommand = (args: string): Promise<string> =>
  bash(
    `env PYWAL_CACHE_DIR='${WAL_DIR}' wal ${args} --out-dir '${WAL_DIR}' -n`,
  );

export const generateColorSchemesByImage = (path: string): Promise<string> =>
  walCommand(`-i '${path}'`);

export const generateRandomColorSchemes = (): Promise<string> =>
  walCommand("--theme random");
