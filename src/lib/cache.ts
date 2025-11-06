import GLib from "gi://GLib";
import app from "ags/gtk4/app";
import { execAsync } from "ags/process";
import {
  cacheDir,
  colorsDest,
  colorsSource,
  cssFile,
  srcStylesDir,
  stylesDir,
  walDir,
  walFile,
} from "@/constants";
import {
  generateColorSchemesByImage,
  generateRandomColorSchemes,
} from "./utils/wal";

export const createCacheDir = () => {
  try {
    if (!GLib.file_test(cacheDir, GLib.FileTest.IS_DIR)) {
      GLib.mkdir_with_parents(cacheDir, 0o755);
      GLib.mkdir_with_parents(walDir, 0o755);
      GLib.file_set_contents(walFile, "");
    }
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    throw error;
  }
};

export const restartCss = async () => {
  const firstRun = !GLib.file_test(stylesDir, GLib.FileTest.IS_DIR);

  try {
    // Copy all styles on first run only
    if (firstRun) {
      GLib.mkdir_with_parents(stylesDir, 0o755);
      await execAsync(["cp", "-r", `${srcStylesDir}/.`, stylesDir]);
      await execAsync(["chmod", "-R", "u+w", stylesDir]);
      await generateRandomColorSchemes();
    }

    await execAsync(["cp", colorsSource, colorsDest]);

    await execAsync([
      "sass",
      GLib.build_filenamev([stylesDir, "index.scss"]),
      cssFile,
    ]);

    await execAsync(["hyprctl", "reload"]);

    app.apply_css(cssFile, true);
  } catch (error) {
    console.error("Failed to restart CSS:", error);
    throw error;
  }
};

export const getWallpaper = () => {
  const wallpaper = GLib.file_get_contents(walFile).toString().trim();
  return wallpaper;
};

export const setWallpaper = async (wallpaper: string) => {
  // Remove existing wallpaper if it exists
  if (!wallpaper) {
    GLib.file_set_contents(walFile, "");
    await restartCss();
    return;
  }

  if (!GLib.file_test(wallpaper, GLib.FileTest.EXISTS)) {
    throw new Error(`Wallpaper file does not exist: ${wallpaper}`);
  }

  try {
    GLib.file_set_contents(walFile, wallpaper);
    await generateColorSchemesByImage(wallpaper);
    await restartCss();
  } catch (error) {
    console.error("Failed to set wallpaper:", error);
    throw error;
  }
};
