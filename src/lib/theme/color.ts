export type ColorMode = "hex" | "tailwind";

export const normalize = (value: string) =>
  value.trim().replace(/^\[|\]$/g, "");

export const toClassValue = (value: string) => {
  const clean = normalize(value);
  return clean.startsWith("#") ? `[${clean}]` : clean;
};
