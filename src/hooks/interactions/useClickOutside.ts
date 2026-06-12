import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { createClickOutsideController } from "@/lib/gtk";

export const useClickOutside = (
  root: Gtk.Widget,
  target: Gtk.Widget,
  onClickOutside: () => void,
) => {
  const controller = createClickOutsideController(root, target, onClickOutside);

  root.add_controller(controller);

  onCleanup(() => {
    root.remove_controller(controller);
  });

  return controller;
};
