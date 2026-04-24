import type z from "zod";
import { BarSchema, barDefaults } from "./bar";
import { GlobalSchema, globalDefaults } from "./global";
import { LauncherSchema, launcherDefaults } from "./launcher";
import { WallpaperSchema, wallpaperDefaults } from "./wallpaper";

export const schemaDefaults = {
  bar: barDefaults,
  global: globalDefaults,
  launcher: launcherDefaults,
  wallpaper: wallpaperDefaults,
} as const;

export const schemas = {
  bar: BarSchema,
  global: GlobalSchema,
  launcher: LauncherSchema,
  wallpaper: WallpaperSchema,
} as const;

export type ConfigKey = keyof typeof schemas;

export type ConfigType<K extends ConfigKey> = z.infer<(typeof schemas)[K]>;

export type Configs = {
  [K in ConfigKey]: ConfigType<K>;
};
