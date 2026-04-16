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

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();
