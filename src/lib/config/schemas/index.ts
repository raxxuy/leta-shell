import type z from "zod";
import { BarSchema, barDefaults } from "./bar";

export const schemaDefaults = {
  bar: barDefaults,
} as const;

export const schemas = {
  bar: BarSchema,
} as const;

export type ConfigKey = keyof typeof schemas;
export type ConfigType<K extends ConfigKey> = z.infer<(typeof schemas)[K]>;
export type Configs = { [K in ConfigKey]: ConfigType<K> };
