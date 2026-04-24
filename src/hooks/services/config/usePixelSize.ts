import type { PixelSize } from "@/schemas/global";
import { useConfig } from "./useConfig";

export const usePixelSize = () => {
  const [pixelSize] = useConfig("global", "pixelSize");

  return {
    xs: pixelSize((ps) => ps.xs),
    sm: pixelSize((ps) => ps.sm),
    md: pixelSize((ps) => ps.md),
    lg: pixelSize((ps) => ps.lg),
    xl: pixelSize((ps) => ps.xl),
    scale: (size: keyof PixelSize, factor: number) =>
      pixelSize((ps) => Math.round(ps[size] * factor)),
  };
};
