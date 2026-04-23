import { SRC_MATUGEN_CONFIG_FILE } from "@/constants";
import { exec } from "@/lib/process";

export const callMatugen = async (
  path: string,
  outDir: string,
): Promise<void> => {
  await exec([
    "matugen",
    "image",
    path,
    "--mode",
    "dark",
    "--config",
    SRC_MATUGEN_CONFIG_FILE,
    "--prefix",
    outDir,
  ]);
};
