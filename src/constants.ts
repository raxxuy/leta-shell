import GLib from "gi://GLib";
import { Gdk } from "ags/gtk4";

export const homeDir = GLib.get_home_dir();
export const cacheDir = GLib.build_filenamev([
  GLib.get_user_cache_dir(),
  "leta-shell",
]);
export const walDir = GLib.build_filenamev([cacheDir, "wal"]);
export const walFile = GLib.build_filenamev([walDir, "wal"]);
export const stylesDir = GLib.build_filenamev([cacheDir, "styles"]);
export const cssFile = GLib.build_filenamev([stylesDir, "index.css"]);
export const srcStylesDir = GLib.build_filenamev([SRC, "src", "styles"]);
export const colorsSource = GLib.build_filenamev([walDir, "colors.scss"]);
export const colorsDest = GLib.build_filenamev([stylesDir, "colors.scss"]);

export const picturesDir =
  GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_PICTURES) ??
  GLib.build_filenamev([homeDir, "Pictures"]);

export const cursors = {
  default: Gdk.Cursor.new_from_name("default", null),
  pointer: Gdk.Cursor.new_from_name("pointer", null),
};
