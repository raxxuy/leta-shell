import useConfig from "@/hooks/services/config/useConfig";
import type { PixelSize } from "@/lib/config/schemas/global";

export const usePixelSize = () => {
  const [pixelSize] = useConfig("global", "pixelSize");

  const xs = pixelSize((ps) => ps.xs);
  const sm = pixelSize((ps) => ps.sm);
  const md = pixelSize((ps) => ps.md);
  const lg = pixelSize((ps) => ps.lg);
  const xl = pixelSize((ps) => ps.xl);

  const scale = (size: keyof PixelSize, factor: number) =>
    pixelSize((ps) => Math.round(ps[size] * factor));

  return {
    xs,
    sm,
    md,
    lg,
    xl,
    scale,
  };
};
