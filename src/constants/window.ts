import type { Astal } from "ags/gtk4";
import { WindowAnchor } from "@/enums";
import type { Anchor } from "@/types/window";

const { TOP, RIGHT, LEFT, BOTTOM, NONE } = WindowAnchor;

export const ANCHORS_MAP: Record<Anchor, Astal.WindowAnchor> = {
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
} as const;
