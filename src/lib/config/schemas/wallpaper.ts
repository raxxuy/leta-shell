import z from "zod";

export const wallpaperDefaults = {
  enabled: true,
  sources: [] as string[],
  monitors: {} as Record<string, string>,
};

export const WallpaperSchema = z.object({
  enabled: z.boolean().default(wallpaperDefaults.enabled),
  sources: z.array(z.string()).default(wallpaperDefaults.sources),
  monitors: z
    .record(z.string(), z.string())
    .default(wallpaperDefaults.monitors),
});
