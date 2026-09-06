import { createReactiveMemo } from "@/lib/reactive";
import type { Anchor, Exclusivity, Keymode, Layer } from "@/lib/window/enums";
import { anchor, exclusivity, keymode, layer } from "@/lib/window/enums";
import type { Reactive } from "@/types/reactive";

export type WindowProps = Omit<
  JSX.IntrinsicElements["window"],
  "anchor" | "exclusivity" | "layer" | "keymode"
> & {
  anchor?: Reactive<Anchor>;
  exclusivity?: Reactive<Exclusivity>;
  keymode?: Reactive<Keymode>;
  layer?: Reactive<Layer>;
};

export default function Window({
  anchor: anchorProp,
  exclusivity: exclusivityProp,
  layer: layerProp,
  keymode: keymodeProp,
  ...props
}: WindowProps) {
  const resolvedAnchor = createReactiveMemo(anchorProp, anchor.resolve);
  const resolvedLayer = createReactiveMemo(layerProp, layer.resolve);
  const resolvedKeymode = createReactiveMemo(keymodeProp, keymode.resolve);
  const resolvedExclusivity = createReactiveMemo(
    exclusivityProp,
    exclusivity.resolve,
  );

  return (
    <window
      anchor={resolvedAnchor}
      exclusivity={resolvedExclusivity}
      keymode={resolvedKeymode}
      layer={resolvedLayer}
      {...props}
    />
  );
}
