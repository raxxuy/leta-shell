import type { Astal } from "ags/gtk4";
import { type Anchor, windowAnchors } from "./anchors";

export const resolveAnchor = (anchor?: Anchor): Astal.WindowAnchor =>
  windowAnchors[anchor ?? "none"];
