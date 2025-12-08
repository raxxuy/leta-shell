import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";

type MenuButtonProps = JSX.IntrinsicElements["menubutton"] & {};

export default function MenuButton(props: MenuButtonProps) {
  const init = (self: Gtk.MenuButton) => {
    // will add a solution for bindings later
    const cssClasses = self.cssClasses;

    const activeHandler = self.connect("notify::active", ({ active }) => {
      if (active) self.cssClasses = [...cssClasses, "active"];
      else self.cssClasses = cssClasses;
    });

    onCleanup(() => self.disconnect(activeHandler));
  };

  return <menubutton $={init} {...props} />;
}
