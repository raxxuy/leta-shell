import { SHADOW_SIZES } from "../constants";

export const generateShadow = (cls: string): string[] | null => {
  // Match arbitrary values: shadow-[0_4px_8px_rgba(0,0,0,0.2)]
  const arbitraryMatch = cls.match(/^shadow-\[(.+)\]$/);

  if (arbitraryMatch) {
    return [`box-shadow: ${arbitraryMatch[1]}`];
  }

  // Match: shadow-md/50, shadow-lg/75, shadow-sm/25
  const opacityMatch = cls.match(/^shadow-(.+)\/(\d+)$/);

  if (opacityMatch) {
    const [, size, opacity] = opacityMatch;
    const shadowValue = SHADOW_SIZES[size as keyof typeof SHADOW_SIZES];

    if (!shadowValue || shadowValue === "none") return null;

    const opacityVal = parseInt(opacity, 10);
    if (opacityVal < 0 || opacityVal > 100) return null;

    // Replace the opacity value in the shadow string
    const newShadow = shadowValue.replace(
      /rgba\(0, 0, 0, ([\d.]+)\)/,
      `rgba(0, 0, 0, ${opacityVal / 100})`,
    );
    return [`box-shadow: ${newShadow}`];
  }

  // Match: shadow-2xs, shadow-xs, shadow-sm, shadow-md, etc.
  const match = cls.match(/^shadow-(.+)$/);

  if (!match) return null;

  const size = match[1];
  const shadowValue = SHADOW_SIZES[size as keyof typeof SHADOW_SIZES];

  if (shadowValue === undefined) return null;

  return [`box-shadow: ${shadowValue}`];
};
