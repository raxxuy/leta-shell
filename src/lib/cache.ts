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

const pathExists = (path: string, isDir = false): boolean =>
  GLib.file_test(path, isDir ? GLib.FileTest.IS_DIR : GLib.FileTest.EXISTS);

const ensureDir = (path: string): void => {
  if (!pathExists(path, true)) {
    GLib.mkdir_with_parents(path, 0o755);
  }
};

const readFile = (path: string): string => {
  const [, contents] = GLib.file_get_contents(path);
  return new TextDecoder().decode(contents);
};

export const createCacheDir = (): void => {
  ensureDir(CACHE_DIR);
  ensureDir(WAL_DIR);

  if (!pathExists(WAL_FILE)) {
    GLib.file_set_contents(WAL_FILE, "");
  }
};

const isFirstRun = (): boolean => !pathExists(STYLES_DIR, true);

const initializeStyles = async (): Promise<void> => {
  ensureDir(STYLES_DIR);
  await bash(
    [
      `cp -r ${SRC_STYLES_DIR}/. ${STYLES_DIR}`,
      `chmod -R u+w ${STYLES_DIR}`,
    ].join(" && "),
  );
  await generateRandomColorSchemes();
};

export const applyCss = async (): Promise<void> => {
  if (isFirstRun()) {
    await initializeStyles();
  }

  await bash(
    [
      `cp ${COLORS_SOURCE} ${COLORS_DEST}`,
      `sass ${STYLES_DIR}/index.scss ${CSS_FILE}`,
      "hyprctl reload",
    ].join(" && "),
  );

  app.apply_css(CSS_FILE, true);
};

export const getWallpaper = (): string => {
  if (!pathExists(WAL_FILE)) return "";
  return readFile(WAL_FILE).trim();
};

export const setWallpaper = async (wallpaper: string): Promise<void> => {
  if (!wallpaper) {
    GLib.file_set_contents(WAL_FILE, "");
    await applyCss();
    return;
  }

  if (!pathExists(wallpaper)) {
    throw new Error(`Wallpaper not found: ${wallpaper}`);
  }

  GLib.file_set_contents(WAL_FILE, wallpaper);
  await generateColorSchemesByImage(wallpaper);
  await applyCss();
};
