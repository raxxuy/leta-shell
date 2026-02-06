import { type Accessor, createComputed } from "ags";
import type { Anchor } from "@/types";
import { access, getAnchor } from "@/utils";

export type WindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor: Anchor | Accessor<Anchor>;
};

export default function Window({ anchor: anchorProp, ...props }: WindowProps) {
  const anchor = createComputed(() => getAnchor(access(anchorProp)));
  return <window anchor={anchor} {...props} />;
}
