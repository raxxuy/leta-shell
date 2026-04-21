import z from "zod";

export const globalDefaults = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  pixelSize: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  },
} as const;

export const GlobalSchema = z.object({
  spacing: z.object({
    xs: z.number().int().nonnegative().default(globalDefaults.spacing.xs),
    sm: z.number().int().nonnegative().default(globalDefaults.spacing.sm),
    md: z.number().int().nonnegative().default(globalDefaults.spacing.md),
    lg: z.number().int().nonnegative().default(globalDefaults.spacing.lg),
    xl: z.number().int().nonnegative().default(globalDefaults.spacing.xl),
  }),
  pixelSize: z.object({
    xs: z.number().int().nonnegative().default(globalDefaults.pixelSize.xs),
    sm: z.number().int().nonnegative().default(globalDefaults.pixelSize.sm),
    md: z.number().int().nonnegative().default(globalDefaults.pixelSize.md),
    lg: z.number().int().nonnegative().default(globalDefaults.pixelSize.lg),
    xl: z.number().int().nonnegative().default(globalDefaults.pixelSize.xl),
  }),
});

export type Spacing = z.infer<typeof GlobalSchema>["spacing"];
export type PixelSize = z.infer<typeof GlobalSchema>["pixelSize"];
export type GlobalConfig = z.infer<typeof GlobalSchema>;
