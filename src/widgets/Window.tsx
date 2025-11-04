import type { Astal } from "ags/gtk4";
import { mapAnchorToNumber } from "@/lib/utils/widget";
import type { Anchor, Props } from "@/types";

type WindowProps = Omit<
  Props<Astal.Window, Astal.Window.ConstructorProps>,
  "anchor"
> & {
  anchor: Anchor;
};

export default function Window({ anchor, ...props }: WindowProps) {
  return <window {...props} anchor={mapAnchorToNumber(anchor)} />;
}
