import { OUTLINE_STYLES } from "@/constants/styles";

export const generateOutline = (cls: string): string[] | null => {
  // Match: outline (default 1px solid)
  if (cls === "outline") {
    return ["outline-width: 1px", "outline-style: solid"];
  }

  // Match outline styles: outline-solid, outline-dashed, outline-dotted, outline-none
  const styleMatch = cls.match(/^outline-(.+)$/);

  if (
    styleMatch &&
    OUTLINE_STYLES.includes(styleMatch[1] as (typeof OUTLINE_STYLES)[number])
  ) {
    if (styleMatch[1] === "none") {
      return ["outline: none"];
    }
    return [`outline-style: ${styleMatch[1]}`];
  }

  // Match arbitrary width: outline-[3px], outline-[0.5rem]
  const arbitraryMatch = cls.match(/^outline-\[(.+)\]$/);

  if (arbitraryMatch) {
    return [`outline-width: ${arbitraryMatch[1]}`, "outline-style: solid"];
  }

  // Match regular width: outline-0, outline-1, outline-2, outline-4, outline-8
  const widthMatch = cls.match(/^outline-(\d+)$/);

  if (widthMatch) {
    const numWidth = parseInt(widthMatch[1], 10);

    if (numWidth >= 0) {
      return [`outline-width: ${numWidth}px`, "outline-style: solid"];
    }
  }

  // Match outline offset arbitrary: outline-offset-[3px], outline-offset-[0.5rem]
  const offsetArbitraryMatch = cls.match(/^outline-offset-\[(.+)\]$/);

  if (offsetArbitraryMatch) {
    return [`outline-offset: ${offsetArbitraryMatch[1]}`];
  }

  // Match negative outline offset: -outline-offset-2, -outline-offset-4
  const negativeOffsetMatch = cls.match(/^-outline-offset-(\d+)$/);

  if (negativeOffsetMatch) {
    const numOffset = parseInt(negativeOffsetMatch[1], 10);

    if (numOffset >= 0) {
      return [`outline-offset: -${numOffset}px`];
    }
  }

  // Match positive outline offset: outline-offset-0, outline-offset-1, outline-offset-2, etc.
  const offsetMatch = cls.match(/^outline-offset-(\d+)$/);

  if (offsetMatch) {
    const numOffset = parseInt(offsetMatch[1], 10);

    if (numOffset >= 0) {
      return [`outline-offset: ${numOffset}px`];
    }
  }

  return null;
};
