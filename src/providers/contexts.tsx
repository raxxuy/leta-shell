import { type Accessor, createContext } from "gnim";
import type { PixelSize, Spacing, ThemeConfig } from "@/lib/config/types";

type Sizes<T> = {
  [K in keyof T]: Accessor<T[K]>;
} & {
  scale: (size: keyof T, factor: number) => Accessor<number>;
};

type ThemeContextValue = {
  spacing: Sizes<Spacing>;
  pixelSize: Sizes<PixelSize>;
  update: (edit: (draft: ThemeConfig) => void) => void;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);
