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
export const WAL_DIR = buildPath(CACHE_DIR, "wal");
export const STYLES_DIR = buildPath(CACHE_DIR, "styles");
export const SRC_STYLES_DIR = buildPath(SRC, "styles");
export const CONFIG_DIR = buildPath(SRC, "config");

// Files
export const WAL_FILE = buildPath(WAL_DIR, "wal");
export const CSS_FILE = buildPath(STYLES_DIR, "index.css");
export const COLORS_SOURCE = buildPath(WAL_DIR, "colors.scss");
export const COLORS_DEST = buildPath(STYLES_DIR, "colors.scss");

// Cursors
const createCursor = (name: string): Gdk.Cursor =>
  Gdk.Cursor.new_from_name(name, null);

export const CURSORS = {
  default: createCursor("default"),
  pointer: createCursor("pointer"),
} as const;
