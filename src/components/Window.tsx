import type { Reactive } from "@/types/reactive";
import type { Anchor } from "@/types/window";
import { createReactiveMemo, getAnchor } from "@/utils";

type WindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor?: Reactive<Anchor>;
};

export default function Window({ anchor: anchorProp, ...props }: WindowProps) {
  const anchor = createReactiveMemo(anchorProp, getAnchor);

  return <window anchor={anchor} {...props} />;
}
