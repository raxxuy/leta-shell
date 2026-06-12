import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { createMouseHoverController } from "@/lib/gtk/controllers";

export const useMouseHover = (
  widget: Gtk.Widget,
  onHover: () => void,
  onLeave: () => void,
) => {
  const controller = createMouseHoverController(onHover, onLeave);

  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
