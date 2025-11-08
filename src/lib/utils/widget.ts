import type { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";
import { WindowAnchor } from "@/enums";
import type { Anchor } from "@/types";

export const mapAnchorToNumber = (anchor: Anchor): Astal.WindowAnchor => {
  switch (anchor) {
    case "none":
      return WindowAnchor.NONE;
    case "top":
      return WindowAnchor.TOP;
    case "right":
      return WindowAnchor.RIGHT;
    case "left":
      return WindowAnchor.LEFT;
    case "bottom":
      return WindowAnchor.BOTTOM;
    case "top-left":
      return WindowAnchor.TOP | WindowAnchor.LEFT;
    case "top-right":
      return WindowAnchor.TOP | WindowAnchor.RIGHT;
    case "bottom-left":
      return WindowAnchor.BOTTOM | WindowAnchor.LEFT;
    case "bottom-right":
      return WindowAnchor.BOTTOM | WindowAnchor.RIGHT;
    case "top-full":
      return WindowAnchor.TOP | WindowAnchor.LEFT | WindowAnchor.RIGHT;
    case "bottom-full":
      return WindowAnchor.BOTTOM | WindowAnchor.LEFT | WindowAnchor.RIGHT;
    case "center":
      return (
        WindowAnchor.LEFT |
        WindowAnchor.RIGHT |
        WindowAnchor.TOP |
        WindowAnchor.BOTTOM
      );
    case "center-inline":
      return WindowAnchor.LEFT | WindowAnchor.RIGHT;
  }
};

export const toggleWindow = (windowName: string) => {
  const window = app.get_window(windowName) as Astal.Window;
  if (window.visible) {
    window.hide();
  } else {
    window.show();
  }
};
