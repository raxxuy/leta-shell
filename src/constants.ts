import GLib from "gi://GLib";
import { Gdk } from "ags/gtk4";

export const homeDir = GLib.get_home_dir();
export const cacheDir = `${GLib.get_user_cache_dir()}/leta-shell`;
export const picturesDir =
  GLib.get_user_special_dir(GLib.UserDirectory.DIRECTORY_PICTURES) ??
  `${homeDir}/Pictures`;

export const cursors = {
  default: Gdk.Cursor.new_from_name("default", null),
  pointer: Gdk.Cursor.new_from_name("pointer", null),
};
