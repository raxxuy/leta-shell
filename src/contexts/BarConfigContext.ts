import { type Accessor, createContext } from "ags";
import type { BarWidget } from "@/lib/config/schemas/bar";

type ConfigTuple<T> = readonly [Accessor<T>, (next: T) => void];

export interface BarLayout {
  readonly center: readonly BarWidget[];
  readonly left: readonly BarWidget[];
  readonly right: readonly BarWidget[];
}

export interface BarConfigShape {
  centerNotchMode: ConfigTuple<"media" | "weather">;
  clockFormat: ConfigTuple<string>;
  height: ConfigTuple<number>;
  layout: ConfigTuple<BarLayout>;
  position: ConfigTuple<"top" | "bottom">;
  visualizerCount: ConfigTuple<number>;
  visualizerEnabled: ConfigTuple<boolean>;
  weatherInterval: ConfigTuple<number>;
  weatherUnit: ConfigTuple<"celsius" | "fahrenheit">;
  workspaceCount: ConfigTuple<number>;
}

export const BarConfigContext = createContext<BarConfigShape>(
  {} as BarConfigShape,
);
