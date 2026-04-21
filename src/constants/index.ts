import GLib from "gi://GLib";
import { UserDirectory } from "@/enums";
import { buildPath } from "@/lib/fs";

// System directories
export const HOME_DIR = GLib.get_home_dir();
export const CACHE_DIR = buildPath(GLib.get_user_cache_dir(), "leta-shell");
export const CONFIG_DIR = buildPath(GLib.get_user_config_dir(), "leta-shell");
export const PICTURES_DIR =
  GLib.get_user_special_dir(UserDirectory.DIRECTORY_PICTURES) ??
  buildPath(HOME_DIR, "Pictures");

// App directories
export const CACHE_SCSS_DIR = buildPath(CACHE_DIR, "scss");
export const CACHE_WALLPAPERS_DIR = buildPath(CACHE_DIR, "wallpapers");
export const CACHE_WALLPAPERS_RENDERED_DIR = buildPath(
  CACHE_WALLPAPERS_DIR,
  "rendered",
);
export const CACHE_WALLPAPERS_ORIGINAL_DIR = buildPath(
  CACHE_WALLPAPERS_DIR,
  "original",
);
export const SRC_SCSS_DIR = buildPath(SRC, "scss");

// Files
export const CACHE_CSS_FILE = buildPath(CACHE_SCSS_DIR, "index.css");
export const CACHE_UTILITIES_FILE = buildPath(CACHE_SCSS_DIR, "utilities.scss");
export const CACHE_UTILITIES_JSON_FILE = buildPath(
  CACHE_SCSS_DIR,
  "utilities.json",
);

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();

export * as Cursor from "./cursor";
