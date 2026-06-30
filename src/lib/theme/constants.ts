import GLib from "gi://GLib";
import { buildPath } from "../fs";

type ThemeSymlink = {
  dest: string;
  reload?: string;
  copy?: boolean;
};

export const THEME_SYMLINKS: Record<string, ThemeSymlink> = {
  ghostty: {
    dest: buildPath(GLib.get_home_dir(), ".config/ghostty/themes/leta-shell"),
    reload: "pkill -SIGUSR2 ghostty",
  },
  fish: {
    dest: buildPath(
      GLib.get_home_dir(),
      ".config/fish/themes/leta-shell.theme",
    ),
    reload: 'yes | fish -c "fish_config theme save leta-shell"',
  },
  hypr: {
    dest: buildPath(GLib.get_home_dir(), ".config/hypr/leta-shell.lua"),
    reload: "hyprctl reload",
  },
  zed: {
    dest: buildPath(GLib.get_home_dir(), ".config/zed/themes/matugen.json"),
  },
};
