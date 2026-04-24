import z from "zod";

export const centerNotchMediaDefaults = {
  visualizer: {
    enabled: true,
    count: 12,
  },
} as const;

export const centerNotchDefaults = {
  mode: "media",
  media: centerNotchMediaDefaults,
} as const;

export const CenterNotchModeEnum = z.enum(["media", "weather"]);

export const CenterNotchMediaSchema = z.object({
  visualizer: z.object({
    enabled: z.boolean().default(centerNotchMediaDefaults.visualizer.enabled),
    count: z.number().default(centerNotchMediaDefaults.visualizer.count),
  }),
});

export const CenterNotchSchema = z.object({
  mode: CenterNotchModeEnum.default(centerNotchDefaults.mode),
  media: CenterNotchMediaSchema.default(centerNotchDefaults.media),
});
