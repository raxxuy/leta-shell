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
};

const NumberSchema = (defaultValue: number) =>
  z.coerce
    .number({ error: "Expected a valid number" })
    .int({ error: "Expected an integer" })
    .positive({ error: "Expected a positive number" })
    .default(defaultValue);

export const ThemeSchema = z.object({
  spacing: z
    .object({
      xs: NumberSchema(themeDefaults.spacing.xs),
      sm: NumberSchema(themeDefaults.spacing.sm),
      md: NumberSchema(themeDefaults.spacing.md),
      lg: NumberSchema(themeDefaults.spacing.lg),
      xl: NumberSchema(themeDefaults.spacing.xl),
    })
    .prefault({}),
  pixelSize: z
    .object({
      "2xs": NumberSchema(themeDefaults.pixelSize["2xs"]),
      xs: NumberSchema(themeDefaults.pixelSize.xs),
      sm: NumberSchema(themeDefaults.pixelSize.sm),
      md: NumberSchema(themeDefaults.pixelSize.md),
      lg: NumberSchema(themeDefaults.pixelSize.lg),
      xl: NumberSchema(themeDefaults.pixelSize.xl),
      "2xl": NumberSchema(themeDefaults.pixelSize["2xl"]),
      "3xl": NumberSchema(themeDefaults.pixelSize["3xl"]),
      "4xl": NumberSchema(themeDefaults.pixelSize["4xl"]),
      "5xl": NumberSchema(themeDefaults.pixelSize["5xl"]),
      "6xl": NumberSchema(themeDefaults.pixelSize["6xl"]),
      "7xl": NumberSchema(themeDefaults.pixelSize["7xl"]),
    })
    .prefault({}),
});
