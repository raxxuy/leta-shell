import GLib from "gi://GLib";
import app from "ags/gtk4/app";
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
import { bash } from "@/lib/utils/shell";
import {
  generateColorSchemesByImage,
  generateRandomColorSchemes,
} from "@/lib/utils/wal";

// Helper to check if directory/file exists
const dirExists = (path: string) => GLib.file_test(path, GLib.FileTest.IS_DIR);
const fileExists = (path: string) => GLib.file_test(path, GLib.FileTest.EXISTS);

export const createCacheDir = () => {
  try {
    if (!dirExists(CACHE_DIR)) {
      GLib.mkdir_with_parents(CACHE_DIR, 0o755);
      GLib.mkdir_with_parents(WAL_DIR, 0o755);
      GLib.file_set_contents(WAL_FILE, "");
    }
  } catch (error) {
    console.error("Failed to create cache directory:", error);
    throw error;
  }
};

export const applyCss = async () => {
  const firstRun = !dirExists(STYLES_DIR);

  try {
    if (firstRun) {
      GLib.mkdir_with_parents(STYLES_DIR, 0o755);
      await bash(`cp -r ${SRC_STYLES_DIR}/. ${STYLES_DIR}`);
      await bash(`chmod -R u+w ${STYLES_DIR}`);
      await generateRandomColorSchemes();
    }

    await bash(`cp ${COLORS_SOURCE} ${COLORS_DEST}`);
    await bash(`sass ${STYLES_DIR}/index.scss ${CSS_FILE}`);
    await bash("hyprctl reload");

    app.apply_css(CSS_FILE, true);
  } catch (error) {
    console.error("Failed to apply CSS:", error);
    throw error;
  }
};

export const getWallpaper = () => {
  const wallpaper = new TextDecoder().decode(
    GLib.file_get_contents(WAL_FILE)[1],
  );
  return wallpaper;
};

export const setWallpaper = async (wallpaper: string) => {
  if (!wallpaper) {
    GLib.file_set_contents(WAL_FILE, "");
    await applyCss();
    return;
  }

  if (!fileExists(wallpaper)) {
    throw new Error(`Wallpaper file does not exist: ${wallpaper}`);
  }

  try {
    GLib.file_set_contents(WAL_FILE, wallpaper);
    await generateColorSchemesByImage(wallpaper);
    await applyCss();
  } catch (error) {
    console.error("Failed to set wallpaper:", error);
    throw error;
  }
};
