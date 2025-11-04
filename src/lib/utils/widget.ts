import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { WindowAnchor } from "@/enums";
import type { Anchor } from "@/types";

export const mapAnchorToNumber = (anchor: Anchor): number => {
  switch (anchor) {
    case "NONE":
      return WindowAnchor.NONE;
    case "TOP":
      return WindowAnchor.TOP;
    case "RIGHT":
      return WindowAnchor.RIGHT;
    case "LEFT":
      return WindowAnchor.LEFT;
    case "BOTTOM":
      return WindowAnchor.BOTTOM;
    case "TOP_LEFT":
      return WindowAnchor.TOP | WindowAnchor.LEFT;
    case "TOP_RIGHT":
      return WindowAnchor.TOP | WindowAnchor.RIGHT;
    case "BOTTOM_LEFT":
      return WindowAnchor.BOTTOM | WindowAnchor.LEFT;
    case "BOTTOM_RIGHT":
      return WindowAnchor.BOTTOM | WindowAnchor.RIGHT;
    case "TOP_FULL":
      return WindowAnchor.TOP | WindowAnchor.LEFT | WindowAnchor.RIGHT;
    case "BOTTOM_FULL":
      return WindowAnchor.BOTTOM | WindowAnchor.LEFT | WindowAnchor.RIGHT;
    case "CENTER":
      return (
        WindowAnchor.LEFT |
        WindowAnchor.RIGHT |
        WindowAnchor.TOP |
        WindowAnchor.BOTTOM
      );
    case "CENTER_INLINE":
      return WindowAnchor.LEFT | WindowAnchor.RIGHT;
  }
};

export const toggleWindow = (windowName: string) => {
  const window = app.get_window(windowName) as Gtk.Window;
  if (window.visible) {
    window.hide();
  } else {
    window.show();
  }
};
