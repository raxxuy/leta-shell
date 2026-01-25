export const generateOpacity = (cls: string): string[] | null => {
  // Match arbitrary values: opacity-[0.73]
  const arbitraryMatch = cls.match(/^opacity-\[(.+)\]$/);

  if (arbitraryMatch) {
    return [`opacity: ${arbitraryMatch[1]}`];
  }

  // Match regular values: opacity-50
  const match = cls.match(/^opacity-(\d+)$/);

  if (!match) return null;

  const opacity = parseInt(match[1], 10);

  if (opacity >= 0 && opacity <= 100) {
    return [`opacity: ${opacity}%`];
  }

  return null;
};
