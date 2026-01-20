import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";

type MenuButtonProps = JSX.IntrinsicElements["menubutton"] & {};

export default function MenuButton(props: MenuButtonProps) {
  const init = (self: Gtk.MenuButton) => {
    const activeHandler = self.connect("notify::active", ({ active }) => {
      if (active) {
        self.set_state_flags(StateFlags.SELECTED, false);
      } else {
        self.unset_state_flags(StateFlags.SELECTED);
      }
    });

    onCleanup(() => self.disconnect(activeHandler));
  };

  return <menubutton $={init} {...props} />;
}
