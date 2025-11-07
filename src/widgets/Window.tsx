import { mapAnchorToNumber } from "@/lib/utils/widget";
import type { Anchor } from "@/types";

type WindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor: Anchor;
};

export default function Window({ anchor, ...props }: WindowProps) {
  return <window {...props} anchor={mapAnchorToNumber(anchor)} />;
}
