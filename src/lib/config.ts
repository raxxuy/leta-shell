import barConfig from "@/config/bar.json";
import globalConfig from "@/config/global.json";
import launcherConfig from "@/config/launcher.json";

export const configs = {
  bar: barConfig,
  global: globalConfig,
  launcher: launcherConfig,
};

export const getConfig = <K extends keyof typeof configs>(
  key: K,
): (typeof configs)[K] => {
  return configs[key];
};
