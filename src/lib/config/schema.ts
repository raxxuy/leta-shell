import { z } from "zod";
import { PICTURES_DIR } from "@/constants";

const barConfigSchema = z.object({
  window: z.object({
    defaultHeight: z.number().min(16).max(64).default(24),
    anchor: z.enum(["top", "bottom"]).default("top"),
    floating: z.boolean().default(true),
    border: z.boolean().default(false),
    bubbles: z.boolean().default(false),
  }),
  layout: z.object({
    start: z.array(z.string()).default(["launcher", "workspaces", "tray"]),
    center: z.array(z.string()).default(["client"]),
    end: z
      .array(z.string())
      .default([
        "battery",
        "sound",
        "bluetooth",
        "notifications",
        "clock",
        "quick-settings",
      ]),
  }),
  modules: z.object({
    workspaces: z.object({
      count: z.number().min(1).max(10).default(10),
      variant: z.enum(["box", "dot"]).default("dot"),
    }),
    clock: z.object({
      currentFormat: z.number().min(0).max(2).default(0),
      formats: z
        .array(z.string())
        .default(["%a %b %d  %I:%M %p", "%a %H:%M", "%H:%M"]),
      fontSize: z.enum(["sm", "md", "lg"]).default("sm"),
    }),
  }),
});

const globalConfigSchema = z.object({
  spacings: z.object({
    small: z.number().default(4),
    medium: z.number().default(10),
    large: z.number().default(20),
    larger: z.number().default(40),
  }),
  icons: z.object({
    pixelSize: z.object({
      small: z.number().default(16),
      medium: z.number().default(32),
      large: z.number().default(48),
      larger: z.number().default(64),
    }),
  }),
});

const backgroundConfigSchema = z.object({
  enabled: z.boolean().default(true),
});

const wallpapersConfigSchema = z.object({
  location: z.string().default(PICTURES_DIR),
});

export const schemas = {
  bar: barConfigSchema,
  global: globalConfigSchema,
  background: backgroundConfigSchema,
  wallpapers: wallpapersConfigSchema,
} as const;

export type Configs = {
  [K in keyof typeof schemas]: z.infer<(typeof schemas)[K]>;
};
