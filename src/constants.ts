import GLib from "gi://GLib";
import { Gdk } from "ags/gtk4";
import { buildPath } from "@/lib/utils";

// System directories
export const HOME_DIR = GLib.get_home_dir();
export const CACHE_DIR = buildPath(GLib.get_user_cache_dir(), "leta-shell");
export const PICTURES_DIR =
  GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_PICTURES) ??
  buildPath(HOME_DIR, "Pictures");

// App directories
export const CACHE_WAL_DIR = buildPath(CACHE_DIR, "wal");
export const CACHE_STYLES_DIR = buildPath(CACHE_DIR, "styles");
export const CACHE_PICTURES_DIR = buildPath(CACHE_DIR, "pictures");
export const SRC_STYLES_DIR = buildPath(SRC, "styles");
export const CONFIGS_DIR = buildPath(SRC, "configs");

// Files
export const WAL_FILE = buildPath(CACHE_WAL_DIR, "wal");
export const CSS_FILE = buildPath(CACHE_STYLES_DIR, "index.css");
export const UTILITIES_JSON_FILE = buildPath(
  CACHE_STYLES_DIR,
  "utilities.json",
);
export const COLORS_SOURCE = buildPath(CACHE_WAL_DIR, "colors.scss");
export const COLORS_DEST = buildPath(CACHE_STYLES_DIR, "colors.scss");

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();

// Cursors
const createCursor = (name: string): Gdk.Cursor =>
  Gdk.Cursor.new_from_name(name, null);

export const CURSORS = {
  default: createCursor("default"),
  pointer: createCursor("pointer"),
} as const;
