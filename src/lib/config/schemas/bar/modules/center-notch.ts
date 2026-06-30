import z from "zod";

export const centerNotchMediaDefaults = {
  visualizer: {
    enabled: true,
    count: 12,
  },
} as const;

export const centerNotchWeatherDefaults = {
  location: "auto",
  unit: "celsius",
  interval: 600000, // 10 minutes
} as const;

export const centerNotchDefaults = {
  mode: "media",
  modules: {
    media: centerNotchMediaDefaults,
    weather: centerNotchWeatherDefaults,
  },
} as const;

export const CenterNotchModeEnum = z.enum(["media", "weather"]);

export const CenterNotchWeatherUnitEnum = z.enum(["celsius", "fahrenheit"]);

export const CenterNotchMediaSchema = z.object({
  visualizer: z.object({
    enabled: z.boolean().default(centerNotchMediaDefaults.visualizer.enabled),
    count: z.number().default(centerNotchMediaDefaults.visualizer.count),
  }),
});

export const CenterNotchWeatherSchema = z.object({
  location: z
    .union([
      z.literal("auto"),
      z.string(),
      z.object({ lat: z.number(), lon: z.number() }),
    ])
    .default(centerNotchWeatherDefaults.location),
  unit: CenterNotchWeatherUnitEnum.default(centerNotchWeatherDefaults.unit),
  interval: z.number().default(centerNotchWeatherDefaults.interval),
});

export const CenterNotchSchema = z.object({
  mode: CenterNotchModeEnum.default(centerNotchDefaults.mode),
  modules: z
    .object({
      media: CenterNotchMediaSchema,
      weather: CenterNotchWeatherSchema,
    })
    .default(centerNotchDefaults.modules),
});

export type CenterNotchMode = z.infer<typeof CenterNotchModeEnum>;
export type CenterNotchWeatherUnit = z.infer<typeof CenterNotchWeatherUnitEnum>;
export type CenterNotchWeatherConfig = z.infer<typeof CenterNotchWeatherSchema>;
