import { createComputed, onCleanup } from "ags";
import { Gdk, type Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { access, addGestureClick } from "@/lib/utils";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  initCss?: boolean;
  onMiddleClicked?: (source: Gtk.Button) => void;
  onSecondaryClicked?: (source: Gtk.Button) => void;
};

const baseStyles = clsx(
  "transition duration-100 rounded text-foreground m-0.25",
  "hover:bg-background-light hover:text-foreground-light",
  "active:bg-background-lighter active:text-foreground-lighter",
  "selected:bg-background-lighter selected:text-foreground-lighter",
);

export default function Button({
  initCss: initCssProp = true,
  class: classProp,
  cssClasses: cssClassesProp,
  onMiddleClicked,
  onSecondaryClicked,
  ...props
}: ButtonProps) {
  const className = createComputed(() => {
    const initCss = initCssProp ? baseStyles : "";
    const className = access(classProp);
    const cssClasses = access(cssClassesProp);
    return clsx(initCss, className, cssClasses);
  });

  const init = (self: Gtk.Button) => {
    const gestures = [
      { callback: onSecondaryClicked, button: Gdk.BUTTON_SECONDARY },
      { callback: onMiddleClicked, button: Gdk.BUTTON_MIDDLE },
    ];

    gestures.forEach(({ callback, button }) => {
      if (callback) {
        const cleanup = addGestureClick(self, button, callback);
        onCleanup(cleanup);
      }
    });
  };

  return <button $={init} class={className} {...props} />;
}
