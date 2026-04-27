import Gio from "gi://Gio";
import { SRC_MATUGEN_CONFIG_FILE } from "@/constants";
import { buildPath, ensureDir } from "../fs";
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
      const destFile = Gio.File.new_for_path(dest);

      // biome-ignore lint/style/noNonNullAssertion: <get_parent() and get_path() are non-null for absolute paths>
      ensureDir(destFile.get_parent()!.get_path()!);

      destFile.delete(null);
      destFile.make_symbolic_link(src, null);
      if (reload) await exec(reload).catch(() => {});
    }),
  );
};
