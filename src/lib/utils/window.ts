import type { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";
import { WindowAnchor } from "@/enums";
import type { Anchor } from "@/types";

const { TOP, RIGHT, LEFT, BOTTOM, NONE } = WindowAnchor;

const ANCHORS_MAP: Record<Anchor, Astal.WindowAnchor> = {
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

export const getAnchor = (anchor: Anchor): Astal.WindowAnchor =>
  ANCHORS_MAP[anchor] ?? NONE;

export const getWindow = (windowName: string): Astal.Window | null => {
  return app.get_window(windowName) as Astal.Window | null;
};

export const toggleWindow = (windowName: string): void => {
  const window = getWindow(windowName);

  if (!window) {
    console.warn(`Window "${windowName}" not found`);
    return;
  }

  window.visible ? window.hide() : window.show();
};
