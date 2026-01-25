import { FONT_SIZES, FONT_WEIGHTS } from "@/lib/styles/constants";

export const generateTypography = (cls: string): string[] | null => {
  // Match arbitrary weight values: font-[500]
  const arbitraryWeightMatch = cls.match(/^font-\[(.+)\]$/);

  if (arbitraryWeightMatch) {
    return [`font-weight: ${arbitraryWeightMatch[1]}`];
  }

  // Match regular weight values: font-bold, font-semibold
  const weightMatch = cls.match(/^font-(.+)$/);

  if (weightMatch) {
    const weight = FONT_WEIGHTS[weightMatch[1] as keyof typeof FONT_WEIGHTS];
    if (weight !== undefined) return [`font-weight: ${weight}`];
  }

  // Match arbitrary size values: text-[14px], text-[1.5rem]
  const arbitrarySizeMatch = cls.match(/^text-\[(.+)\]$/);

  if (arbitrarySizeMatch) {
    return [`font-size: ${arbitrarySizeMatch[1]}`];
  }

  // Match regular size values: text-sm, text-lg
  const sizeMatch = cls.match(/^text-(.+)$/);

  if (sizeMatch) {
    const size = FONT_SIZES[sizeMatch[1] as keyof typeof FONT_SIZES];
    if (size !== undefined) return [`font-size: ${size}rem`];
  }

  return null;
};
