import Gio from "gi://Gio";

import { execAsync } from "ags/process";

import { SRC_PALETTE_TEMPLATES_DIR } from "@/constants";
import { buildPath, ensureDir, writeFile } from "../fs";
import { exec } from "../process";
import { THEME_SYMLINKS } from "./constants";

export const THEME_OUTPUTS = ["colors.scss", ...Object.keys(THEME_SYMLINKS)];

export const callPalette = async (
  path: string,
  outDir: string,
): Promise<void> => {
  const configPath = buildPath(outDir, "palette.toml");
  const templates = THEME_OUTPUTS.map(
    (file) =>
      `${JSON.stringify(buildPath(SRC_PALETTE_TEMPLATES_DIR, file))} = ${JSON.stringify(file)}`,
  );
  writeFile(configPath, `[templates]\n${templates.join("\n")}\n`);
  await execAsync([
    "leta-toolkit",
    "palette",
    "--image",
    path,
    "--config",
    configPath,
  ]);
};

export const relinkTheme = async (themeDir: string): Promise<void> => {
  await Promise.all(
    Object.entries(THEME_SYMLINKS).map(
      async ([file, { dest, reload, copy }]) => {
        const src = buildPath(themeDir, file);
        const destFile = Gio.File.new_for_path(dest);

        // biome-ignore lint/style/noNonNullAssertion: <get_parent() and get_path() are non-null for absolute paths>
        ensureDir(destFile.get_parent()!.get_path()!);

        if (copy) {
          const srcFile = Gio.File.new_for_path(src);
          srcFile.copy(destFile, Gio.FileCopyFlags.OVERWRITE, null, null);
        } else {
          if (destFile.query_exists(null)) destFile.delete(null);
          destFile.make_symbolic_link(src, null);
        }

        if (reload) await exec(reload).catch(() => {});
      },
    ),
  );
};
