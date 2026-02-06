import { BORDER_STYLES, DIRECTIONS } from "@/constants/styles";

export const generateBorder = (cls: string): string[] | null => {
  if (cls === "border") {
    return ["border-width: 1px", "border-style: solid"];
  }

  // Match border styles: border-solid, border-dashed, border-dotted, border-none
  const styleMatch = cls.match(/^border-(.+)$/);

  if (
    styleMatch &&
    BORDER_STYLES.includes(styleMatch[1] as (typeof BORDER_STYLES)[number])
  ) {
    return [`border-style: ${styleMatch[1]}`];
  }

  // Match arbitrary values: border-[3px], border-x-[2px]
  const arbitraryMatch = cls.match(/^border(?:-([xytrbl]))?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, dir = "", value] = arbitraryMatch;
    const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
    return [
      ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${value}`),
      "border-style: solid",
    ];
  }

  // Match regular values: border-2, border-x-4
  const widthMatch = cls.match(/^border(?:-([xytrbl]))?-(\d+)$/);

  if (widthMatch) {
    const [, dir = "", width] = widthMatch;
    const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
    const numWidth = parseInt(width, 10);

    if (numWidth >= 0) {
      return [
        ...parts.map((p) => `border${p ? `-${p}` : ""}-width: ${numWidth}px`),
        "border-style: solid",
      ];
    }
  }

  return null;
};
