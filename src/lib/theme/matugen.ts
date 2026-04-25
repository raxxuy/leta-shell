import Gio from "gi://Gio";
import { SRC_MATUGEN_CONFIG_FILE } from "@/constants";
import { buildPath } from "../fs";
import { exec } from "../process";
import { THEME_SYMLINKS } from "./constants";

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

export const relinkTheme = async (themeDir: string): Promise<void> => {
  await Promise.all(
    Object.entries(THEME_SYMLINKS).map(async ([file, { dest, reload }]) => {
      const src = buildPath(themeDir, file);
      Gio.File.new_for_path(dest).delete(null);
      Gio.File.new_for_path(dest).make_symbolic_link(src, null);
      if (reload) await exec(reload);
    }),
  );
};
