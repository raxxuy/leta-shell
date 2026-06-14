import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { createSelectionController } from "@/lib/gtk/controllers";

export const useSelection = (
  widget: Gtk.Widget,
  onSelect: (x: number, y: number, w: number, h: number) => void,
  onRelease: () => void,
) => {
  const controller = createSelectionController(onSelect, onRelease);

  widget.add_controller(controller);

  onCleanup(() => {
    widget.remove_controller(controller);
  });

  return controller;
};
