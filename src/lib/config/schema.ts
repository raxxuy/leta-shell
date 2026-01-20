import { z } from "zod";

export const barConfigSchema = z.object({
  window: z.object({
    defaultHeight: z.number().min(16).max(64).default(24),
    floating: z.boolean().default(true),
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

export const globalConfigSchema = z.object({
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

export const backgroundConfigSchema = z.object({
  enabled: z.boolean().default(true),
});

export const launcherConfigSchema = z.object({
  modules: z.object({
    items: z.object({
      delay: z.number().min(0).max(1000).default(100),
    }),
  }),
});

export const schemas = {
  bar: barConfigSchema,
  global: globalConfigSchema,
  launcher: launcherConfigSchema,
  background: backgroundConfigSchema,
};

// Export types
export type BarConfig = z.infer<typeof barConfigSchema>;
export type GlobalConfig = z.infer<typeof globalConfigSchema>;
export type LauncherConfig = z.infer<typeof launcherConfigSchema>;
export type BackgroundConfig = z.infer<typeof backgroundConfigSchema>;
