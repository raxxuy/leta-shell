import { Gdk, type Gtk } from "ags/gtk4";

export const createEscape = (onEscape: () => void) => {
  return (_: Gtk.EventControllerKey, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) {
      onEscape();
    }
  };
};
