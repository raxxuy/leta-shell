import type { Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";

export const bindMenuButtonState = (self: Gtk.MenuButton) => {
  self.connect("notify::active", () => {
    if (self.active) {
      self.set_state_flags(StateFlags.CHECKED, false);
    } else {
      self.unset_state_flags(StateFlags.CHECKED);
    }
  });
};
