import GLib from "gi://GLib";
import { UserDirectory } from "@/enums";
import { buildPath } from "@/lib/fs";

const APP = "leta-shell";

// System directories
export const HOME_DIR = GLib.get_home_dir();
export const CACHE_DIR = buildPath(GLib.get_user_cache_dir(), APP);
export const CONFIG_DIR = buildPath(GLib.get_user_config_dir(), APP);
export const PICTURES_DIR =
  GLib.get_user_special_dir(UserDirectory.DIRECTORY_PICTURES) ??
  buildPath(HOME_DIR, "Pictures");

// Cache directories
export const CACHE_SCSS_DIR = buildPath(CACHE_DIR, "scss");
export const CACHE_THEMES_DIR = buildPath(CACHE_DIR, "themes");

export const CACHE_WALLPAPERS_DIR = buildPath(CACHE_DIR, "wallpapers");
export const CACHE_WALLPAPERS_RENDERED_DIR = buildPath(
  CACHE_WALLPAPERS_DIR,
  "rendered",
);
export const CACHE_WALLPAPERS_ORIGINAL_DIR = buildPath(
  CACHE_WALLPAPERS_DIR,
  "original",
);

// Source directories
export const SRC_SCSS_DIR = buildPath(SRC, "scss");
export const SRC_MATUGEN_DIR = buildPath(SRC, "matugen");

// Cache files
export const CACHE_CSS_FILE = buildPath(CACHE_SCSS_DIR, "index.css");
export const CACHE_COLORS_FILE = buildPath(CACHE_SCSS_DIR, "colors.scss");
export const CACHE_UTILITIES_FILE = buildPath(CACHE_SCSS_DIR, "utilities.scss");
export const CACHE_UTILITIES_JSON_FILE = buildPath(
  CACHE_SCSS_DIR,
  "utilities.json",
);

// Source files
export const SRC_COLORS_FILE = buildPath(SRC_SCSS_DIR, "colors.scss");
export const SRC_MATUGEN_CONFIG_FILE = buildPath(
  SRC_MATUGEN_DIR,
  "config.toml",
);

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();

export * as Cursor from "./cursor";
