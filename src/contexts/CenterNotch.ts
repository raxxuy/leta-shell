import { type Accessor, createContext, type Setter } from "ags";

export interface CenterNotchShape {
  dragging: Accessor<boolean>;
  hovered: Accessor<boolean>;
  open: Accessor<boolean>;
  setDragging: Setter<boolean>;
  setHovered: Setter<boolean>;
  setOpen: Setter<boolean>;
  setTransitioning: Setter<"next" | "prev" | null>;
  transitioning: Accessor<"next" | "prev" | null>;
}

export const CenterNotchContext = createContext<CenterNotchShape>(
  {} as CenterNotchShape,
);
