import type { Accessor } from "gnim";
import type { z } from "zod";
import type { configs } from "./schemas";

export type ConfigKey = keyof typeof configs;
export type Config = { [K in ConfigKey]: z.output<(typeof configs)[K]> };
export type ConfigInput = { [K in ConfigKey]?: z.input<(typeof configs)[K]> };

export type ThemeConfig = Config["theme"];
export type Spacing = ThemeConfig["spacing"];
export type PixelSize = ThemeConfig["pixelSize"];

export type WallpaperConfig = Config["wallpaper"];

export type ConfigValue = Readonly<Config>;

export interface ConfigStore {
  readonly path: string;
  reload(): void;
  reset(): void;
  save(): void;
  set(input: ConfigInput): void;
  update(edit: (draft: Config) => void): void;
  readonly value: Accessor<ConfigValue>;
}
