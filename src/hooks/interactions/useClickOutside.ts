import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import {
  type ClickOutsideOptions,
  createClickOutsideController,
} from "@/lib/gtk";

export const useClickOutside = (
  root: Gtk.Widget,
  options: ClickOutsideOptions,
) => {
  const controller = createClickOutsideController(root, options);

  root.add_controller(controller);

  onCleanup(() => root.remove_controller(controller));

  return controller;
};
