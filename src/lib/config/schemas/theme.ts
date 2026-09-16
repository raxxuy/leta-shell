import z from "zod";

export const themeDefaults = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  pixelSize: {
    "2xs": 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 28,
    "3xl": 32,
    "4xl": 36,
    "5xl": 40,
    "6xl": 44,
    "7xl": 48,
  },
  colors: {
    base: {
      value: "zinc-950",
      opacity: 95,
    },
  },
} as const;

const NumberSchema = (defaultValue: number) =>
  z.coerce
    .number({ error: (iss) => `Expected a number, got ${iss.input}` })
    .int({ error: (iss) => `Expected an integer, got ${iss.input}` })
    .nonnegative({
      error: (iss) => `Expected a non-negative number, got ${iss.input}`,
    })
    .default(defaultValue);

const ColorSchema = (defaultValue: string, opacityDefaultValue: number) =>
  z.object({
    value: z
      .string({ error: (iss) => `Expected a string, got ${iss.input}` })
      .transform((value) => value.trim() || defaultValue)
      .default(defaultValue),
    opacity: NumberSchema(opacityDefaultValue),
  });

export const ThemeSchema = z.object({
  spacing: z.object({
    xs: NumberSchema(themeDefaults.spacing.xs),
    sm: NumberSchema(themeDefaults.spacing.sm),
    md: NumberSchema(themeDefaults.spacing.md),
    lg: NumberSchema(themeDefaults.spacing.lg),
    xl: NumberSchema(themeDefaults.spacing.xl),
  }),
  pixelSize: z.object({
    xs: NumberSchema(themeDefaults.pixelSize.xs),
    sm: NumberSchema(themeDefaults.pixelSize.sm),
    md: NumberSchema(themeDefaults.pixelSize.md),
    lg: NumberSchema(themeDefaults.pixelSize.lg),
    xl: NumberSchema(themeDefaults.pixelSize.xl),
  }),
  colors: z.object({
    base: ColorSchema(
      themeDefaults.colors.base.value,
      themeDefaults.colors.base.opacity,
    ),
  }),
});

export type SizeKey = keyof z.infer<typeof ThemeSchema>["spacing"];
export type ColorKey = keyof z.infer<typeof ThemeSchema>["colors"];
export type Spacing = z.infer<typeof ThemeSchema>["spacing"];
export type PixelSize = z.infer<typeof ThemeSchema>["pixelSize"];
export type Colors = z.infer<typeof ThemeSchema>["colors"];
export type Color = z.infer<ReturnType<typeof ColorSchema>>;
export type ThemeConfig = z.infer<typeof ThemeSchema>;
