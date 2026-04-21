import type z from "zod";
import { BarSchema, barDefaults } from "./bar";
import { GlobalSchema, globalDefaults } from "./global";
import { wallpaperDefaults, wallpaperSchema } from "./wallpaper";

export const schemaDefaults = {
  bar: barDefaults,
  wallpaper: wallpaperDefaults,
  global: globalDefaults,
} as const;

export const schemas = {
  bar: BarSchema,
  wallpaper: wallpaperSchema,
  global: GlobalSchema,
} as const;

export type ConfigKey = keyof typeof schemas;

export type ConfigType<K extends ConfigKey> = z.infer<(typeof schemas)[K]>;

export type Configs = {
  [K in ConfigKey]: ConfigType<K>;
};
