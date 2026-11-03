import Gdk from "gi://Gdk?version=4.0";
import GLib from "gi://GLib?version=2.0";

import { buildPath } from "./lib/fs";

const APP = "leta-shell";
export const SRC = GLib.getenv("LETA_SHELL_ASSETS") || GLib.get_current_dir();

export const CACHE_DIR = buildPath(GLib.get_user_cache_dir(), APP);
export const CONFIG_DIR = buildPath(GLib.get_user_config_dir(), APP);

// System
export const USER_NAME = GLib.get_user_name();
export const HOST_NAME = GLib.get_host_name();

// Thumbnail size
export const THUMBNAIL_WIDTH = 400;
export const THUMBNAIL_HEIGHT = 225;

const createCursor = (name: string): Gdk.Cursor =>
  Gdk.Cursor.new_from_name(name, null) as Gdk.Cursor;

export const Cursors = {
  DEFAULT: createCursor("default"),
  POINTER: createCursor("pointer"),
  TEXT: createCursor("text"),
  GRAB: createCursor("grab"),
  GRABBING: createCursor("grabbing"),
};
