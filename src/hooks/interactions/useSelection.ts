import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { createSelectionController, type SelectionOptions } from "@/lib/gtk";

export const useSelection = (widget: Gtk.Widget, options: SelectionOptions) => {
  const controller = createSelectionController(options);

  widget.add_controller(controller);

  onCleanup(() => widget.remove_controller(controller));

  return controller;
};
