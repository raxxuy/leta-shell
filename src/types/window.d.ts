import type { Gtk } from "ags/gtk4";

export type Anchor =
  | "none"
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-full"
  | "bottom-full"
  | "center"
  | "center-inline";

type PositionKey =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type Position = Record<
  PositionKey,
  { halign: Gtk.Align; valign: Gtk.Align }
>;
