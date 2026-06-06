import { createContext } from "ags";
import type { WebSearchEngine } from "@/lib/config/schemas/launcher";
import type { ConfigTuple } from "@/types/config";

export interface LauncherConfigShape {
  maxResults: ConfigTuple<number>;
  webSearchEngine: ConfigTuple<WebSearchEngine>;
}

export const LauncherConfigContext = createContext<LauncherConfigShape>(
  {} as LauncherConfigShape,
);
