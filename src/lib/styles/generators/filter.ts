import { BLUR_SIZES, SHADOW_SIZES } from "@/constants/styles";

export const generateFilter = (cls: string): string[] | null => {
  // Match values: grayscale, invert, sepia
  if (["grayscale", "invert", "sepia"].includes(cls)) {
    return [`filter: ${cls}(1)`];
  }

  // Match arbitrary blur values: blur-[8px]
  const arbitraryBlurMatch = cls.match(/^blur-\[(.+)\]$/);

  if (arbitraryBlurMatch) {
    return [`filter: blur(${arbitraryBlurMatch[1]})`];
  }

  // Match regular blur values: blur-none, blur-sm, blur-lg
  const blurMatch = cls.match(/^blur-(.+)$/);

  if (blurMatch) {
    const size = BLUR_SIZES[blurMatch[1] as keyof typeof BLUR_SIZES];
    if (size !== undefined) return [`filter: blur(${size}px)`];
  }

  // Match drop-shadow values: drop-shadow-sm, drop-shadow-lg
  const dropShadowMatch = cls.match(/^drop-shadow-(.+)$/);

  if (dropShadowMatch) {
    const size = dropShadowMatch[1];
    const shadowValue = SHADOW_SIZES[size as keyof typeof SHADOW_SIZES];
    if (shadowValue && size !== "inner" && shadowValue !== "none") {
      return [`filter: drop-shadow(${shadowValue})`];
    }
  }

  // Match arbitrary values: brightness-[150], contrast-[1.5], saturate-[200]
  const arbitraryFilterMatch = cls.match(
    /^(brightness|contrast|hue-rotate|saturate)-\[(.+)\]$/,
  );

  if (arbitraryFilterMatch) {
    const [, filter, value] = arbitraryFilterMatch;
    const filterName = filter === "hue-rotate" ? "hue-rotate" : filter;
    return [`filter: ${filterName}(${value})`];
  }

  // Match regular filters: brightness-50, contrast-150, saturate-200, hue-rotate-90
  const filterMatch = cls.match(
    /^(brightness|contrast|saturate|hue-rotate)-(\d+)$/,
  );

  if (filterMatch) {
    const [, filter, value] = filterMatch;
    const numValue = parseInt(value, 10);

    if (filter === "hue-rotate") {
      if (numValue >= 0 && numValue <= 360) {
        return [`filter: hue-rotate(${numValue}deg)`];
      }
    } else {
      if (numValue >= 0 && numValue <= 300) {
        return [`filter: ${filter}(${numValue}%)`];
      }
    }
  }

  return null;
};
