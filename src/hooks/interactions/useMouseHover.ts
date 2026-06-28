import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import {
  createMouseHoverController,
  type MouseHoverOptions,
} from "@/lib/gtk/controllers";

export const useMouseHover = (
  widget: Gtk.Widget,
  options: MouseHoverOptions = {},
) => {
  const controller = createMouseHoverController(options);

  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
