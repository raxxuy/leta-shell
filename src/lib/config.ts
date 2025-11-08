import barConfig from "@/config/bar.json";
import type { BarSchema } from "@/config/bar.schema";

export const configs = {
  bar: barConfig as BarSchema,
} as const;
