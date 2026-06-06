import z from "zod";
import { ModuleSettingsSchema, moduleSettingsDefaults } from "./modules";

export const barWidgets = [
  "center-notch",
  "clock",
  "indicators",
  "settings",
  "tray",
  "workspaces",
] as const;

export const barDefaults = {
  position: "top",
  height: 40,
  layout: {
    left: ["workspaces", "tray"] as BarWidget[],
    center: ["center-notch"] as BarWidget[],
    right: ["indicators", "clock", "settings"] as BarWidget[],
  },
  settings: moduleSettingsDefaults,
} as const;

export const BarSchema = z.object({
  position: z.enum(["top", "bottom"]).default(barDefaults.position),
  height: z.number().int().min(38).max(60).default(barDefaults.height),
  layout: z.object({
    left: z
      .array(z.enum(barWidgets))
      .default(barDefaults.layout.left)
      .readonly(),
    center: z
      .array(z.enum(barWidgets))
      .default(barDefaults.layout.center)
      .readonly(),
    right: z
      .array(z.enum(barWidgets))
      .default(barDefaults.layout.right)
      .readonly(),
  }),
  settings: ModuleSettingsSchema.default(moduleSettingsDefaults),
});

export type BarWidget = (typeof barWidgets)[number];

export type BarConfig = z.infer<typeof BarSchema>;
