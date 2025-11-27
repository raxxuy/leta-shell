import barConfig from "@/config/bar.json";
import type { BarSchema } from "@/config/bar.schema";
import launcherConfig from "@/config/launcher.json";
import type { LauncherSchema } from "@/config/launcher.schema";
import wallpapersConfig from "@/config/wallpapers.json";
import type { WallpapersSchema } from "@/config/wallpapers.schema";

export const configs = {
  bar: barConfig as BarSchema,
  launcher: launcherConfig as LauncherSchema,
  wallpapers: wallpapersConfig as WallpapersSchema,
} as const;

export const getConfig = <K extends keyof typeof configs>(
  key: K,
): (typeof configs)[K] => {
  return configs[key];
};
