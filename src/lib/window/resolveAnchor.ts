import { Astal } from "ags/gtk4";
import type { Anchor } from "@/types/window";
import { WINDOW_ANCHORS_MAP } from "./constants";

export const resolveAnchor = (
  anchor: Anchor | undefined,
): Astal.WindowAnchor =>
  anchor
    ? (WINDOW_ANCHORS_MAP[anchor] ?? Astal.WindowAnchor.NONE)
    : Astal.WindowAnchor.NONE;
