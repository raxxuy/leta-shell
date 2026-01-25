import { Accessor } from "ags";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { range } from "es-toolkit";
import { PropagationPhase } from "@/enums";

export const access = <T>(object: T | Accessor<T>): T => {
  return object instanceof Accessor ? object() : object;
};

export function addGestureClick<T extends Gtk.Widget>(
  widget: T,
  button: number,
  callback: (source: T) => void,
) {
  const gesture = new Gtk.GestureClick({
    propagationPhase: PropagationPhase.CAPTURE,
    button,
  });

  const handler = gesture.connect("released", () => callback(widget));
  widget.add_controller(gesture);

  return () => gesture.disconnect(handler); // Return cleanup function
}

export const getUsedClasses = (widget?: Gtk.Widget): string[] => {
  const classes = new Set<string>();

  const traverse = (w: Gtk.Widget) => {
    w.get_css_classes().forEach((cls) => {
      classes.add(cls);
    });

    const children = w.observe_children();

    range(children.get_n_items()).forEach((i) => {
      const child = children.get_item(i);
      if (child) traverse(child as Gtk.Widget);
    });
  };

  (widget ? [widget] : app.windows).forEach(traverse);
  return Array.from(classes);
};

export const findWidget = (
  widget: Gtk.Widget,
  predicate: (widget: Gtk.Widget) => boolean,
): Gtk.Widget | null => {
  if (predicate(widget)) return widget;

  const children = widget.observe_children();

  for (let i = 0; i < children.get_n_items(); i++) {
    const child = children.get_item(i);

    if (child) {
      const found = findWidget(child as Gtk.Widget, predicate);
      if (found) return found;
    }
  }

  return null;
};
