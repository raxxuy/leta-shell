import { getAnchor } from "@/lib/utils";
import type { Anchor } from "@/types/widget";

export type WindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor: Anchor;
};

export default function Window({ anchor, ...props }: WindowProps) {
  return <window anchor={getAnchor(anchor)} {...props} />;
}
