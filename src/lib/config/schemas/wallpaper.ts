import z from "zod";

export const wallpaperDefaults = {
  enabled: true,
  useGlobal: false,
  globalWallpaper: null,
  monitorWallpapers: {} as Record<string, string>,
} as const;

export const WallpaperSchema = z.object({
  enabled: z
    .boolean({ error: (iss) => `Expected a boolean, got ${iss.input}` })
    .default(wallpaperDefaults.enabled),
  useGlobal: z
    .boolean({ error: (iss) => `Expected a boolean, got ${iss.input}` })
    .default(wallpaperDefaults.useGlobal),
  globalWallpaper: z
    .string({ error: (iss) => `Expected a string, got ${iss.input}` })
    .nullable()
    .default(wallpaperDefaults.globalWallpaper),
  monitorWallpapers: z
    .record(
      z.string({ error: (iss) => `Expected a string, got ${iss.input}` }),
      z.string({ error: (iss) => `Expected a string, got ${iss.input}` }),
    )
    .default(wallpaperDefaults.monitorWallpapers),
});

export type WallpaperConfig = z.infer<typeof WallpaperSchema>;
