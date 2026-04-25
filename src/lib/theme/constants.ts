import GLib from "gi://GLib";
import { buildPath } from "../fs";

export const SCSS_HEADER = [
  "/* Auto-generated utility classes */",
  "",
  "/* Utility classes */",
].join("\n");

export const VARIABLES = {
  "shadow-2xs": "0 1px rgb(0 0 0 / 0.3)",
  "shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.3)",
  "shadow-sm": "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
  "shadow-md":
    "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
  "shadow-lg":
    "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
  "shadow-xl":
    "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
  "shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.3)",
} as const;

export const THEME_SYMLINKS: Record<string, { dest: string; reload?: string }> =
  {
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
      dest: buildPath(GLib.get_home_dir(), ".config/hypr/leta-shell.conf"),
      reload: "hyprctl reload",
    },
  };
