import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";

import type { ClickOptions } from "@/lib/gtk/controllers";
import { createClickController } from "@/lib/gtk/controllers";

export const useClick = (widget: Gtk.Widget, options: ClickOptions) => {
  const controller = createClickController(options);
  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
