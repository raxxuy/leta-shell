import { createComputed, onCleanup } from "ags";
import { Gdk, type Gtk } from "ags/gtk4";
import clsx from "clsx/lite";
import { access, addGestureClick } from "@/utils";

type ButtonProps = JSX.IntrinsicElements["button"] & {
  initCss?: boolean;
  onMiddleClicked?: (source: Gtk.Button) => void;
  onSecondaryClicked?: (source: Gtk.Button) => void;
};

const baseStyles = clsx(
  "transition duration-100 rounded text-on-surface m-0.25",
  "hover:bg-background-light hover:text-on-surface-light",
  "active:bg-background-lighter active:text-on-surface-lighter",
  "selected:bg-background-lighter selected:text-on-surface-lighter",
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
    const cleanups = [
      onSecondaryClicked &&
        addGestureClick(self, Gdk.BUTTON_SECONDARY, onSecondaryClicked),
      onMiddleClicked &&
        addGestureClick(self, Gdk.BUTTON_MIDDLE, onMiddleClicked),
    ].filter(Boolean);

    onCleanup(() =>
      cleanups.forEach((cleanup) => {
        cleanup?.();
      }),
    );
  };

  return <button $={init} class={className} {...props} />;
}
