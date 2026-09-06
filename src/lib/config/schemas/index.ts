import type z from "zod";

import { LauncherSchema, launcherDefaults } from "./launcher";
import { ThemeSchema, themeDefaults } from "./theme";
import { WallpaperSchema, wallpaperDefaults } from "./wallpaper";

export const schemaDefaults = {
  launcher: launcherDefaults,
  theme: themeDefaults,
  wallpaper: wallpaperDefaults,
} as const;

export const schemas = {
  launcher: LauncherSchema,
  theme: ThemeSchema,
  wallpaper: WallpaperSchema,
} as const;

export type ConfigKey = keyof typeof schemas;

export type ConfigType<K extends ConfigKey> = z.infer<(typeof schemas)[K]>;

export type Configs = {
  [K in ConfigKey]: ConfigType<K>;
};
