import z from "zod";

export const wallpaperDefaults = {
  enabled: true,
  useGlobal: false,
  globalWallpaper: null,
  monitorWallpapers: {} as Record<string, string>,
} as const;

export const WallpaperSchema = z.object({
  enabled: z.boolean().default(wallpaperDefaults.enabled),
  useGlobal: z.boolean().default(wallpaperDefaults.useGlobal),
  globalWallpaper: z
    .string()
    .nullable()
    .default(wallpaperDefaults.globalWallpaper),
  monitorWallpapers: z
    .record(z.string(), z.string())
    .default(wallpaperDefaults.monitorWallpapers),
});

export type WallpaperConfig = z.infer<typeof WallpaperSchema>;
