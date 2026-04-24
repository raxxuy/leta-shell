import { useConfig } from "./useConfig";

export const useSpacing = () => {
  const [spacing] = useConfig("global", "spacing");

  return {
    xs: spacing((s) => s.xs),
    sm: spacing((s) => s.sm),
    md: spacing((s) => s.md),
    lg: spacing((s) => s.lg),
    xl: spacing((s) => s.xl),
  };
};
