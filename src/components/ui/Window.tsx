import { createReactiveMemo } from "@/lib/reactive";
import { resolveAnchor } from "@/lib/window";
import type { Reactive } from "@/types/reactive";
import type { Anchor } from "@/types/window";

type WindowProps = Omit<JSX.IntrinsicElements["window"], "anchor"> & {
  anchor?: Reactive<Anchor>;
};

export default function Window({ anchor: anchorProp, ...props }: WindowProps) {
  const anchor = createReactiveMemo(anchorProp, resolveAnchor);

  return <window anchor={anchor} {...props} />;
}
