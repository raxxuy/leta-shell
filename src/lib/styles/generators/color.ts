import { COLOR_PROPS, COLOR_VARIANTS, COLORS } from "../constants";

export const generateColor = (cls: string): string[] | null => {
  // Match values: bg-background, text-color-12, border-foreground-lighter/80
  const match = cls.match(
    /^(bg|text|border)-([a-z0-9-]+?)(-(?:dark|darker|light|lighter))?(\/(\d+))?$/,
  );

  if (!match) return null;

  const [, propKey, colorName, variant = "", , opacity] = match;
  const color = COLORS[colorName as keyof typeof COLORS];
  const prop = COLOR_PROPS[propKey as keyof typeof COLOR_PROPS];

  if (!color || !prop) return null;

  const variantKey = variant.slice(1) as keyof typeof COLOR_VARIANTS;
  const variantSuffix = COLOR_VARIANTS[variantKey] || COLOR_VARIANTS[""];
  const colorValue = `${color}${variantSuffix ? `_${variantSuffix}` : ""}`;

  if (opacity) {
    const opacityVal = parseInt(opacity, 10);
    if (opacityVal < 0 || opacityVal > 100) return null;
    return [`${prop}: rgba(${colorValue}, ${opacityVal}%)`];
  }

  return [`${prop}: ${colorValue}`];
};
