import type { Accessor } from "ags";
import { createContext } from "ags";

import { useConfig } from "@/hooks/services/useConfig";
import type {
  Color,
  ColorKey,
  PixelSize,
  SizeKey,
  Spacing,
} from "@/lib/config/schemas/theme";

type Sizes<T extends Record<SizeKey, number>> = {
  [K in SizeKey]: Accessor<T[K]>;
} & {
  scale: (size: keyof T, factor: number) => Accessor<number>;
};

interface ThemeContextValue {
  colors: Record<ColorKey, Accessor<string>>;
  pixelSize: Sizes<PixelSize>;
  spacing: Sizes<Spacing>;
}

interface ThemeProviderProps {
  children: () => JSX.Element;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [spacing] = useConfig("theme", "spacing");
  const [pixelSize] = useConfig("theme", "pixelSize");
  const [colors] = useConfig("theme", "colors");

  const convertToClass = (color: Color) => `${color.color}/${color.opacity}`;

  const value: ThemeContextValue = {
    colors: {
      base: colors((c) => convertToClass(c.base)),
    },
    spacing: {
      xs: spacing((s) => s.xs),
      sm: spacing((s) => s.sm),
      md: spacing((s) => s.md),
      lg: spacing((s) => s.lg),
      xl: spacing((s) => s.xl),
      scale: (size, factor) => spacing((s) => Math.round(s[size] * factor)),
    },
    pixelSize: {
      xs: pixelSize((s) => s.xs),
      sm: pixelSize((s) => s.sm),
      md: pixelSize((s) => s.md),
      lg: pixelSize((s) => s.lg),
      xl: pixelSize((s) => s.xl),
      scale: (size, factor) => pixelSize((s) => Math.round(s[size] * factor)),
    },
  };

  return <ThemeContext value={value}>{children}</ThemeContext>;
};

export const useTheme = () => {
  const context = ThemeContext.use();
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");

  return context;
};
