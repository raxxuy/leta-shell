import GLib from "gi://GLib";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import {
  CACHE_DIR,
  COLORS_DEST,
  COLORS_SOURCE,
  CSS_FILE,
  SRC_STYLES_DIR,
  STYLES_DIR,
  WAL_DIR,
  WAL_FILE,
} from "@/constants";
import {
  generateColorSchemesByImage,
  generateRandomColorSchemes,
} from "./utils/wal";

export const createCacheDir = () => {
  try {
    if (!GLib.file_test(CACHE_DIR, GLib.FileTest.IS_DIR)) {
      GLib.mkdir_with_parents(CACHE_DIR, 0o755);
      GLib.mkdir_with_parents(WAL_DIR, 0o755);
      GLib.file_set_contents(WAL_FILE, "");
    }
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    throw error;
  }
};

export const restartCss = async () => {
  const firstRun = !GLib.file_test(STYLES_DIR, GLib.FileTest.IS_DIR);

  try {
    // Copy all styles on first run only
    if (firstRun) {
      GLib.mkdir_with_parents(STYLES_DIR, 0o755);
      await execAsync(["cp", "-r", `${SRC_STYLES_DIR}/.`, STYLES_DIR]);
      await execAsync(["chmod", "-R", "u+w", STYLES_DIR]);
      await generateRandomColorSchemes();
    }

    await execAsync(["cp", COLORS_SOURCE, COLORS_DEST]);

    await execAsync([
      "sass",
      GLib.build_filenamev([STYLES_DIR, "index.scss"]),
      CSS_FILE,
    ]);

    await execAsync(["hyprctl", "reload"]);

    app.apply_css(CSS_FILE, true);
  } catch (error) {
    console.error("Failed to restart CSS:", error);
    throw error;
  }
};

export const getWallpaper = () => {
  const wallpaper = GLib.file_get_contents(WAL_FILE).toString().trim();
  return wallpaper;
};

export const setWallpaper = async (wallpaper: string) => {
  // Remove existing wallpaper if it exists
  if (!wallpaper) {
    GLib.file_set_contents(WAL_FILE, "");
    await restartCss();
    return;
  }

  if (!GLib.file_test(wallpaper, GLib.FileTest.EXISTS)) {
    throw new Error(`Wallpaper file does not exist: ${wallpaper}`);
  }

  try {
    GLib.file_set_contents(WAL_FILE, wallpaper);
    await generateColorSchemesByImage(wallpaper);
    await restartCss();
  } catch (error) {
    console.error("Failed to set wallpaper:", error);
    throw error;
  }
};
