import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";

import { createEscapeController } from "@/lib/gtk/controllers";

export const useEscape = (widget: Gtk.Widget, onEscape: () => void) => {
  const controller = createEscapeController(onEscape);

  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
