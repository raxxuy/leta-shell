import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { type ClickOptions, createClickController } from "@/lib/gtk";

export const useClick = (widget: Gtk.Widget, options: ClickOptions) => {
  const controller = createClickController(options);

  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
