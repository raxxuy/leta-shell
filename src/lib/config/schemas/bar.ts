import { z } from "zod";
import { ModuleConfigSchema, moduleConfigDefaults } from "./modules";

export const barDefaults = {
  position: "top",
  height: 34,
  modules: {
    left: [],
    center: [],
    right: [],
  },
  moduleConfig: moduleConfigDefaults,
} as const;

export const BarSchema = z.object({
  position: z.enum(["top", "bottom"]).default("top"),
  height: z.number().int().min(1).default(34),
  modules: z.object({
    left: z.array(z.string()).default([]),
    center: z.array(z.string()).default([]),
    right: z.array(z.string()).default([]),
  }),
  moduleConfig: ModuleConfigSchema.default(moduleConfigDefaults),
});

export type BarConfig = z.infer<typeof BarSchema>;
