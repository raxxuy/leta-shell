import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";

export const createMenuButton = (self: Gtk.MenuButton) => {
  const id = self.connect("notify::active", () => {
    if (self.active) self.set_state_flags(StateFlags.CHECKED, false);
    else self.unset_state_flags(StateFlags.CHECKED);
  });

  onCleanup(() => self.disconnect(id));
};
