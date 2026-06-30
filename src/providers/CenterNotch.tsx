import { createState } from "ags";
import {
  CenterNotchContext,
  type CenterNotchShape,
} from "@/contexts/CenterNotch";

interface CenterNotchProviderProps {
  children: () => JSX.Element;
}

export default function CenterNotchProvider({
  children,
}: CenterNotchProviderProps) {
  const [open, setOpen] = createState(false);
  const [hovered, setHovered] = createState(false);
  const [dragging, setDragging] = createState(false);
  const [transitioning, setTransitioning] = createState<"next" | "prev" | null>(
    null,
  );

  const value: CenterNotchShape = {
    dragging,
    hovered,
    open,
    transitioning,
    setDragging,
    setHovered,
    setOpen,
    setTransitioning,
  };

  return <CenterNotchContext value={value}>{children}</CenterNotchContext>;
}
