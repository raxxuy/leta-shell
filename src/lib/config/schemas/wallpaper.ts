import z from "zod";

export const wallpaperDefaults = {
  enabled: true,
  useGlobal: false,
  globalWallpaper: "",
  monitorWallpapers: {} as Record<string, string>,
} as const;

export const wallpaperSchema = z.object({
  enabled: z.boolean().default(wallpaperDefaults.enabled),
  useGlobal: z.boolean().default(wallpaperDefaults.useGlobal),
  globalWallpaper: z.string().default(wallpaperDefaults.globalWallpaper),
  monitorWallpapers: z
    .record(z.string(), z.string())
    .default(wallpaperDefaults.monitorWallpapers),
});

export type WallpaperConfig = z.infer<typeof wallpaperSchema>;
