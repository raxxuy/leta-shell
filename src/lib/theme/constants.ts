import GLib from "gi://GLib";

import { buildPath } from "../fs";

type ThemeSymlink = {
  copy?: boolean;
  dest: string;
  reload?: string;
};

export const THEME_SYMLINKS: Record<string, ThemeSymlink> = {
  ghostty: {
    dest: buildPath(GLib.get_home_dir(), ".config/ghostty/themes/leta-shell"),
    reload: "pkill -SIGUSR2 ghostty",
  },
  hypr: {
    dest: buildPath(GLib.get_home_dir(), ".config/hypr/leta-shell.lua"),
    reload: "hyprctl reload",
  },
};
