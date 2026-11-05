import type { GnimNode } from "gnim";
import type { PixelSize, Spacing, ThemeConfig } from "@/lib/config/types";
import ConfigService from "@/services/config";
import { ThemeContext } from "./contexts";

type ConfigProviderProps = {
  children: GnimNode;
};

export const ThemeProvider = ({ children }: ConfigProviderProps) => {
  const { theme, store } = ConfigService.get_default();

  const spacing = {
    xs: theme.as((value) => value.spacing.xs),
    sm: theme.as((value) => value.spacing.sm),
    md: theme.as((value) => value.spacing.md),
    lg: theme.as((value) => value.spacing.lg),
    xl: theme.as((value) => value.spacing.xl),
    scale: (size: keyof Spacing, factor: number) =>
      theme.as((value) => Math.round(value.spacing[size] * factor)),
  };

  const pixelSize = {
    "2xs": theme.as((value) => value.pixelSize["2xs"]),
    xs: theme.as((value) => value.pixelSize.xs),
    sm: theme.as((value) => value.pixelSize.sm),
    md: theme.as((value) => value.pixelSize.md),
    lg: theme.as((value) => value.pixelSize.lg),
    xl: theme.as((value) => value.pixelSize.xl),
    "2xl": theme.as((value) => value.pixelSize["2xl"]),
    "3xl": theme.as((value) => value.pixelSize["3xl"]),
    "4xl": theme.as((value) => value.pixelSize["4xl"]),
    "5xl": theme.as((value) => value.pixelSize["5xl"]),
    "6xl": theme.as((value) => value.pixelSize["6xl"]),
    "7xl": theme.as((value) => value.pixelSize["7xl"]),
    scale: (size: keyof PixelSize, factor: number) =>
      theme.as((value) => Math.round(value.pixelSize[size] * factor)),
  };

  const update = (edit: (draft: ThemeConfig) => void): void =>
    store.update((draft) => edit(draft.theme));

  return (
    <ThemeContext value={{ spacing, pixelSize, update }}>
      {children}
    </ThemeContext>
  );
};
