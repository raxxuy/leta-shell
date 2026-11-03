import type Gtk from "gi://Gtk?version=4.0";
import { execAsync } from "@gnim-js/io/process";

import { cacheDir } from "@/lib/cache";
import { copyFile, fileExists } from "@/lib/fs";
import {
  CACHE_COLORS_SCSS,
  CACHE_SCSS_DIR,
  SRC_COLORS_SCSS,
  SRC_SCSS_DIR,
} from "./constants";
import { compileCss } from "./css";
import { scan } from "./plugin";

export { compileCss } from "./css";
export { cleanupWidget, scan } from "./plugin";

const initializeStyles = async (): Promise<void> => {
  cacheDir("scss");

  if (!fileExists(CACHE_COLORS_SCSS)) {
    copyFile(SRC_COLORS_SCSS, CACHE_COLORS_SCSS);
  }

  await execAsync([
    "rsync",
    "-a",
    "--exclude=utilities.scss",
    "--exclude=colors.scss",
    `${SRC_SCSS_DIR}/`,
    `${CACHE_SCSS_DIR}/`,
  ]);
  await execAsync(["chmod", "-R", "u+w", CACHE_SCSS_DIR]);
};

export const applyTheme = async (
  application: Gtk.Application,
): Promise<void> => {
  try {
    await initializeStyles();
    await Promise.all(
      application.get_windows().map((window) => scan?.(window)),
    );
    await compileCss();
  } catch (error) {
    console.error("Failed to apply theme:", error);
  }
};
