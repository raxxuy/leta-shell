import { ROUNDED_DIRS, ROUNDED_SIZES } from "@/constants/styles";

export const generateRounded = (cls: string): string[] | null => {
  // Match arbitrary values: rounded-[12px], rounded-t-[0.5rem]
  const arbitraryMatch = cls.match(/^rounded(?:-([setrbl]))?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, dir = "", value] = arbitraryMatch;
    const parts = ROUNDED_DIRS[dir as keyof typeof ROUNDED_DIRS] || [""];
    return parts.map((dr) => `border${dr ? `-${dr}` : ""}-radius: ${value}`);
  }

  // Match regular values: rounded, rounded-lg, rounded-t-xl
  const match = cls.match(/^rounded(?:-([setrbl]))?(?:-(.+))?$/);

  if (!match) return null;

  const [, dir = "", size = ""] = match;
  const sizeValue = size
    ? ROUNDED_SIZES[size as keyof typeof ROUNDED_SIZES]
    : 0.5;

  if (sizeValue === undefined) return null;

  const parts = ROUNDED_DIRS[dir as keyof typeof ROUNDED_DIRS] || [""];
  return parts.map(
    (dr) => `border${dr ? `-${dr}` : ""}-radius: ${sizeValue}rem`,
  );
};
