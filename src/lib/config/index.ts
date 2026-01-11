import backgroundConfig from "@/configs/background.json";
import barConfig from "@/configs/bar.json";
import colorsConfig from "@/configs/colors.json";
import globalConfig from "@/configs/global.json";
import launcherConfig from "@/configs/launcher.json";
import { CONFIGS_DIR } from "@/constants";
import {
  backgroundConfigSchema,
  barConfigSchema,
  colorsConfigSchema,
  globalConfigSchema,
  launcherConfigSchema,
} from "@/lib/config/schema";
import { buildPath, writeFile } from "@/lib/utils";

export const configs = {
  bar: barConfigSchema.parse(barConfig),
  colors: colorsConfigSchema.parse(colorsConfig),
  global: globalConfigSchema.parse(globalConfig),
  launcher: launcherConfigSchema.parse(launcherConfig),
  background: backgroundConfigSchema.parse(backgroundConfig),
} as const;

export const getConfig = <K extends keyof typeof configs>(
  key: K,
): (typeof configs)[K] => configs[key];

export const writeConfig = async <K extends keyof typeof configs>(
  key: K,
  config: Partial<(typeof configs)[K]>,
): Promise<void> => {
  const merged = { ...configs[key], ...config };
  const filePath = buildPath(CONFIGS_DIR, `${key}.json`);
  writeFile(filePath, JSON.stringify(merged, null, 2));
};
