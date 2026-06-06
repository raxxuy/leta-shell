import { createContext } from "ags";
import type { ConfigTuple } from "@/types/config";

export interface DockConfigShape {
  autohide: ConfigTuple<boolean>;
}

export const DockConfigContext = createContext<DockConfigShape>(
  {} as DockConfigShape,
);
