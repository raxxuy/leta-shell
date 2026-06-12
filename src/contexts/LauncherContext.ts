import { type Accessor, createContext } from "ags";
import type { LauncherResult } from "@/services/launcher/types";

export interface LauncherShape {
  clear: () => void;
  hasResults: Accessor<boolean>;
  results: Accessor<LauncherResult[]>;
  search: (query: string) => void;
}

export const LauncherContext = createContext<LauncherShape>(
  {} as LauncherShape,
);
