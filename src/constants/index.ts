import GLib from "gi://GLib";
import { UserDirectory } from "@/enums";
import { buildPath } from "@/utils";

// System directories
export const HOME_DIR = GLib.get_home_dir();
export const CACHE_DIR = buildPath(GLib.get_user_cache_dir(), "leta-shell");
export const CONFIG_DIR = buildPath(GLib.get_user_config_dir(), "leta-shell");
export const PICTURES_DIR =
  GLib.get_user_special_dir(UserDirectory.DIRECTORY_PICTURES) ??
  buildPath(HOME_DIR, "Pictures");

// App directories
export const CACHE_STYLES_DIR = buildPath(CACHE_DIR, "styles");
export const CACHE_PICTURES_DIR = buildPath(CACHE_DIR, "pictures");
export const CACHE_MATUGEN_DIR = buildPath(CACHE_DIR, "matugen");
export const SRC_STYLES_DIR = buildPath(SRC, "styles");
export const SRC_MATUGEN_DIR = buildPath(SRC, "matugen");

// Files
export const CSS_FILE = buildPath(CACHE_STYLES_DIR, "index.css");
export const UTILITIES_FILE = buildPath(CACHE_STYLES_DIR, "utilities.scss");
export const UTILITIES_JSON_FILE = buildPath(
  CACHE_STYLES_DIR,
  "utilities.json",
);
export const WALLPAPER_FILE = buildPath(CACHE_DIR, "wallpaper");
export const USER_PICTURE_FILE = buildPath(CONFIG_DIR, "user");

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();

export * as Cursors from "./cursors";
