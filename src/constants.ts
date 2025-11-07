import GLib from "gi://GLib";
import { Gdk } from "ags/gtk4";

// System directories
export const HOME_DIR = GLib.get_home_dir();
export const CACHE_DIR = GLib.build_filenamev([
  GLib.get_user_cache_dir(),
  "leta-shell",
]);
export const PICTURES_DIR =
  GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_PICTURES) ??
  GLib.build_filenamev([HOME_DIR, "Pictures"]);

// App directories
export const WAL_DIR = GLib.build_filenamev([CACHE_DIR, "wal"]);
export const STYLES_DIR = GLib.build_filenamev([CACHE_DIR, "styles"]);
export const SRC_STYLES_DIR = GLib.build_filenamev([SRC, "src", "styles"]);
export const CONFIG_DIR = GLib.build_filenamev([SRC, "config"]);

// Files
export const WAL_FILE = GLib.build_filenamev([WAL_DIR, "wal"]);
export const CSS_FILE = GLib.build_filenamev([STYLES_DIR, "index.css"]);
export const COLORS_SOURCE = GLib.build_filenamev([WAL_DIR, "colors.scss"]);
export const COLORS_DEST = GLib.build_filenamev([STYLES_DIR, "colors.scss"]);

// Cursors
export const CURSORS = {
  default: Gdk.Cursor.new_from_name("default", null),
  pointer: Gdk.Cursor.new_from_name("pointer", null),
} as const;
