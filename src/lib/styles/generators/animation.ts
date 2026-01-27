import { ANIMATIONS } from "../constants";

export const generateAnimation = (cls: string): string[] | null => {
  // Match: animate-none
  if (cls === "animate-none") {
    return ["animation: none"];
  }

  // Match arbitrary values: animate-[spin_2s_linear_infinite]
  const arbitraryMatch = cls.match(/^animate-\[(.+)\]$/);

  if (arbitraryMatch) {
    const value = arbitraryMatch[1].replace(/_/g, " ");
    return [`animation: ${value}`];
  }

  // Match regular values: animate-spin, animate-pulse
  const match = cls.match(/^animate-(.+)$/);

  if (!match) return null;

  const animation = ANIMATIONS[match[1] as keyof typeof ANIMATIONS];

  if (!animation) return null;

  return [`animation: ${animation}`];
};
