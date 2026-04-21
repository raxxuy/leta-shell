import { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";
import type { Anchor } from "@/types/window";
import { WINDOW_ANCHORS_MAP } from "./constants";

export const resolveAnchor = (
  anchor: Anchor | undefined,
): Astal.WindowAnchor =>
  anchor
    ? (WINDOW_ANCHORS_MAP[anchor] ?? Astal.WindowAnchor.NONE)
    : Astal.WindowAnchor.NONE;

export const toggleWindow = (windowName: string): void => {
  const window = app.get_window(windowName);

  if (!window) {
    console.warn(`Window "${windowName}" not found`);
    return;
  }

  window.visible ? window.hide() : window.show();
};
