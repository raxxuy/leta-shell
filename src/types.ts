import type { Gtk } from "ags/gtk4";
import type { CCProps } from "gnim";

export type Props<T extends Gtk.Widget, Props> = CCProps<T, Partial<Props>>;
export type Anchor =
  | "NONE"
  | "TOP"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "TOP_FULL"
  | "BOTTOM"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "BOTTOM_FULL"
  | "LEFT"
  | "RIGHT"
  | "CENTER"
  | "CENTER_INLINE";
