import { DIRECTIONS, SPACING_PROPS } from "@/constants/styles";

export const generateSpacing = (cls: string): string[] | null => {
  // Match arbitrary values: w-[64px], p-[2.5rem], m-[10%], p-[5px_10px], m-[5px_10px_15px_20px]
  const arbitraryMatch = cls.match(/^([pmwh])([xytrbl])?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, prop, dir = "", value] = arbitraryMatch;
    const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];

    // For width/height, multi-value doesn't make sense
    if (["w", "h"].includes(prop)) {
      return [`${cssProp}: ${value}`];
    }

    // If there's a direction specified, don't allow multi-value
    if (dir) {
      const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
      return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${value}`);
    }

    // For padding/margin without direction, allow multi-value (replace _ with space)
    const cssValue = value.replace(/_/g, " ");
    return [`${cssProp}: ${cssValue}`];
  }

  // Match regular values: p-4, m-2.5, w-64
  const match = cls.match(/^([pmwh])([xytrbl])?-([\d.]+)$/);

  if (!match) return null;

  const [, prop, dir = "", value] = match;
  const numValue = parseFloat(value);

  if (Number.isNaN(numValue) || numValue < 0) return null;

  const remValue = (numValue * 0.25).toFixed(3).replace(/\.?0+$/, "");
  const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];

  if (["w", "h"].includes(prop)) {
    return [`${cssProp}: ${remValue}rem`];
  }

  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
  return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${remValue}rem`);
};
