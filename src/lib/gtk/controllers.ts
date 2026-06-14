import Graphene from "gi://Graphene";
import { Gdk, Gtk } from "ags/gtk4";

export const createClickOutsideController = (
  root: Gtk.Widget,
  target: Gtk.Widget,
  onClickOutside: () => void,
) => {
  const controller = new Gtk.GestureClick();
  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  const handler = (_: Gtk.GestureClick, __: unknown, x: number, y: number) => {
    const [, rect] = target.compute_bounds(root);
    const point = new Graphene.Point({ x, y });

    if (!rect.contains_point(point)) {
      onClickOutside();
    }
  };

  controller.connect("pressed", handler);

  return controller;
};

export const createSelectionController = (
  onUpdate: (x: number, y: number, w: number, h: number) => void,
  onRelease: () => void,
) => {
  const controller = new Gtk.GestureDrag();
  let start: { x: number; y: number } | null = null;

  controller.connect("drag-begin", (_, x, y) => {
    start = { x: Math.round(x), y: Math.round(y) };
    onUpdate(Math.round(x), Math.round(y), 0, 0);
  });

  controller.connect("drag-update", (_, offsetX, offsetY) => {
    if (!start) return;
    const x2 = start.x + offsetX;
    const y2 = start.y + offsetY;
    onUpdate(
      Math.round(Math.min(start.x, x2)),
      Math.round(Math.min(start.y, y2)),
      Math.round(Math.abs(offsetX)),
      Math.round(Math.abs(offsetY)),
    );
  });

  controller.connect("drag-end", () => {
    start = null;
    onRelease();
  });

  return controller;
};

export const createEscapeController = (onEscape: () => void) => {
  const controller = new Gtk.EventControllerKey();
  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  const handler = (_: Gtk.EventControllerKey, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) {
      onEscape();
    }
  };

  controller.connect("key-pressed", handler);

  return controller;
};

export const createMouseHoverController = (
  onHover: () => void,
  onLeave: () => void,
) => {
  const controller = new Gtk.EventControllerMotion();
  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  controller.connect("enter", onHover);
  controller.connect("leave", onLeave);

  return controller;
};
