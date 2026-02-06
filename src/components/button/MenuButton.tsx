import { createComputed, onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { StateFlags } from "@/enums";
import { access } from "@/utils";

type MenuButtonProps = JSX.IntrinsicElements["menubutton"] & {
  initCss?: boolean;
};

const baseStyles = clsx(
  "transition duration-100 rounded text-on-surface m-0.25",
  "hover:bg-background-light hover:text-on-surface-light",
  "active:bg-background-lighter active:text-on-surface-lighter",
  "selected:bg-background-lighter selected:text-on-surface-lighter",
);

export default function MenuButton({
  initCss: initCssProp = true,
  class: classProp,
  cssClasses: cssClassesProp,
  ...props
}: MenuButtonProps) {
  const className = createComputed(() => {
    const initCss = initCssProp ? baseStyles : "";
    const className = access(classProp);
    const cssClasses = access(cssClassesProp);
    return clsx(initCss, className, cssClasses);
  });

  const init = (self: Gtk.MenuButton) => {
    const activeHandler = self.connect("notify::active", ({ active }) => {
      if (active) self.set_state_flags(StateFlags.SELECTED, false);
      else self.unset_state_flags(StateFlags.SELECTED);
    });

    onCleanup(() => self.disconnect(activeHandler));
  };

  return <menubutton $={init} class={className} {...props} />;
}
