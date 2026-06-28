import { createState } from "ags";
import { BarConfigContext } from "@/contexts/BarConfigContext";
import {
  CenterNotchContext,
  type CenterNotchShape,
} from "@/contexts/CenterNotchContext";
import { CenterNotchModeEnum } from "@/lib/config/schemas/bar/modules/center-notch";

interface CenterNotchProviderProps {
  children: () => JSX.Element;
}

export default function CenterNotchProvider({
  children,
}: CenterNotchProviderProps) {
  const [open, setOpen] = createState(false);
  const [hovered, setHovered] = createState(false);
  const {
    centerNotchMode: [mode],
  } = BarConfigContext.use();
  const modes = CenterNotchModeEnum.options;

  const value: CenterNotchShape = {
    hovered,
    mode,
    modes,
    open,
    setHovered,
    setOpen,
  };

  return <CenterNotchContext value={value}>{children}</CenterNotchContext>;
}
