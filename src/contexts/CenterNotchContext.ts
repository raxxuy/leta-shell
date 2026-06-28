import { type Accessor, createContext, type Setter } from "ags";
import type { CenterNotchMode } from "@/lib/config/schemas/bar/modules/center-notch";

export interface CenterNotchShape {
  hovered: Accessor<boolean>;
  mode: Accessor<CenterNotchMode>;
  modes: CenterNotchMode[];
  open: Accessor<boolean>;
  setHovered: Setter<boolean>;
  setOpen: Setter<boolean>;
}

export const CenterNotchContext = createContext<CenterNotchShape>(
  {} as CenterNotchShape,
);
