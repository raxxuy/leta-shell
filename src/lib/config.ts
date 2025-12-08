import barConfig from "@/config/bar.json";
import launcherConfig from "@/config/launcher.json";
import wallpapersConfig from "@/config/wallpapers.json";

export const configs = {
  bar: barConfig,
  launcher: launcherConfig,
  wallpapers: wallpapersConfig,
};

export const getConfig = <K extends keyof typeof configs>(
  key: K,
): (typeof configs)[K] => {
  return configs[key];
};
