import z from "zod";
import { ModuleSettingsSchema, moduleSettingsDefaults } from "./modules";

export const barDefaults = {
  position: "top",
  height: 40,
  layout: {
    left: ["workspaces"] as string[],
    center: ["center-notch"] as string[],
    right: [] as string[],
  },
  settings: moduleSettingsDefaults,
} as const;

export const BarSchema = z.object({
  position: z.enum(["top", "bottom"]).default(barDefaults.position),
  height: z.number().int().min(1).default(barDefaults.height),
  layout: z.object({
    left: z.array(z.string()).default(barDefaults.layout.left).readonly(),
    center: z.array(z.string()).default(barDefaults.layout.center).readonly(),
    right: z.array(z.string()).default(barDefaults.layout.right).readonly(),
  }),
  settings: ModuleSettingsSchema.default(moduleSettingsDefaults),
});

export type BarConfig = z.infer<typeof BarSchema>;
