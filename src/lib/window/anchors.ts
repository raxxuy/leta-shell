import { WindowAnchor } from "@/enums";

const { TOP, RIGHT, LEFT, BOTTOM, NONE } = WindowAnchor;

export const windowAnchors = {
  none: NONE,
  top: TOP,
  left: LEFT,
  right: RIGHT,
  bottom: BOTTOM,
  "top-left": TOP | LEFT,
  "top-right": TOP | RIGHT,
  "bottom-left": BOTTOM | LEFT,
  "bottom-right": BOTTOM | RIGHT,
  "top-full": TOP | LEFT | RIGHT,
  "bottom-full": BOTTOM | LEFT | RIGHT,
  center: LEFT | RIGHT | TOP | BOTTOM,
  "center-inline": LEFT | RIGHT,
};

export type Anchor = keyof typeof windowAnchors;
