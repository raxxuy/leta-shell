import { COLOR_PROPS, COLOR_VARIANTS, COLORS } from "@/constants/styles";

export const generateColor = (cls: string): string[] | null => {
  // Check for arbitrary values first: bg-[#fff], text-[rgb(255,0,0)], border-[hsl(0,100%,50%)]
  const arbitraryMatch = cls.match(
    /^(bg|text|border|outline)-\[([^\]]+)\](\/(\d+))?$/,
  );

  if (arbitraryMatch) {
    const [, propKey, arbitraryValue, , opacity] = arbitraryMatch;
    const prop = COLOR_PROPS[propKey as keyof typeof COLOR_PROPS];

    if (!prop) return null;

    if (opacity) {
      const opacityVal = parseInt(opacity, 10);
      if (opacityVal < 0 || opacityVal > 100) return null;

      // Convert arbitrary value to rgba if possible
      // If it's already rgb/rgba/hsl/hsla, wrap it; if hex, convert it
      if (arbitraryValue.startsWith("#")) {
        const hex = arbitraryValue.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return [`${prop}: rgba(${r}, ${g}, ${b}, ${opacityVal / 100})`];
      } else if (arbitraryValue.startsWith("rgb")) {
        // Extract rgb values and convert to rgba
        const rgbMatch = arbitraryValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          return [
            `${prop}: rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacityVal / 100})`,
          ];
        }
      }
      // For other formats, just apply opacity as best we can
      return [
        `${prop}: color-mix(in srgb, ${arbitraryValue} ${opacityVal}%, transparent)`,
      ];
    }

    return [`${prop}: ${arbitraryValue}`];
  }

  // Match values: bg-background, text-primary, border-surface-container-lighter/80
  const match = cls.match(
    /^(bg|text|border|outline)-([a-z0-9-]+?)(-(?:dark|darker|light|lighter))?(\/(\d+))?$/,
  );

  if (!match) return null;

  const [, propKey, colorName, variant = "", , opacity] = match;
  const color = COLORS[colorName as keyof typeof COLORS];
  const prop = COLOR_PROPS[propKey as keyof typeof COLOR_PROPS];

  if (!color || !prop) return null;

  const variantKey = variant.slice(1) as keyof typeof COLOR_VARIANTS;
  const variantSuffix = COLOR_VARIANTS[variantKey] || COLOR_VARIANTS[""];
  const colorVar = `${color}${variantSuffix ? `_${variantSuffix}` : ""}`;

  if (opacity) {
    const opacityVal = parseInt(opacity, 10);
    if (opacityVal < 0 || opacityVal > 100) return null;
    return [
      `${prop}: color-mix(in srgb, ${colorVar} ${opacityVal}%, transparent)`,
    ];
  }

  return [`${prop}: ${colorVar}`];
};
