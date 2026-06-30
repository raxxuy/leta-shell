import Graphene from "gi://Graphene";
import { Gdk, Gtk } from "ags/gtk4";

export interface ClickOutsideOptions {
  onClickOutside: () => void;
  target: Gtk.Widget;
}

export const createClickOutsideController = (
  root: Gtk.Widget,
  { target, onClickOutside }: ClickOutsideOptions,
) => {
  const controller = new Gtk.GestureClick({
    propagationPhase: Gtk.PropagationPhase.CAPTURE,
  });

  const handler = (_: Gtk.GestureClick, __: unknown, x: number, y: number) => {
    const [, rect] = target.compute_bounds(root);
    const point = new Graphene.Point({ x, y });
    if (!rect.contains_point(point)) onClickOutside();
  };

  controller.connect("pressed", handler);

  return controller;
};

export interface DragOptions {
  onBegin?: (x: number, y: number) => void;
  onEnd?: (offsetX: number, offsetY: number) => void;
  onUpdate?: (
    startX: number,
    startY: number,
    offsetX: number,
    offsetY: number,
  ) => void;
  propagationPhase?: Gtk.PropagationPhase;
  rounded?: boolean;
}

export const createDragController = ({
  onBegin,
  onEnd,
  onUpdate,
  propagationPhase = Gtk.PropagationPhase.BUBBLE,
  rounded = false,
}: DragOptions) => {
  const controller = new Gtk.GestureDrag({
    propagationPhase: propagationPhase,
  });

  const r = (n: number) => (rounded ? Math.round(n) : n);

  let startX = 0;
  let startY = 0;

  controller.connect("drag-begin", (_, x: number, y: number) => {
    startX = r(x);
    startY = r(y);
    onBegin?.(startX, startY);
  });

  controller.connect("drag-update", (_, offsetX: number, offsetY: number) => {
    onUpdate?.(startX, startY, r(offsetX), r(offsetY));
  });

  controller.connect("drag-end", (_, offsetX: number, offsetY: number) => {
    onEnd?.(r(offsetX), r(offsetY));
  });

  return controller;
};

export interface SelectionOptions {
  onRelease?: () => void;
  onUpdate: (x: number, y: number, w: number, h: number) => void;
}

export const createSelectionController = ({
  onUpdate,
  onRelease,
}: SelectionOptions) => {
  return createDragController({
    rounded: true,
    propagationPhase: Gtk.PropagationPhase.CAPTURE,
    onBegin: (x, y) => onUpdate(x, y, 0, 0),
    onUpdate: (startX, startY, offsetX, offsetY) => {
      const x2 = startX + offsetX;
      const y2 = startY + offsetY;
      onUpdate(
        Math.min(startX, x2),
        Math.min(startY, y2),
        Math.abs(offsetX),
        Math.abs(offsetY),
      );
    },
    onEnd: () => onRelease?.(),
  });
};

export const createEscapeController = (onEscape: () => void) => {
  const controller = new Gtk.EventControllerKey({
    propagationPhase: Gtk.PropagationPhase.CAPTURE,
  });

  const handler = (_: Gtk.EventControllerKey, keyval: number) => {
    if (keyval === Gdk.KEY_Escape) onEscape();
  };

  controller.connect("key-pressed", handler);

  return controller;
};

export interface MouseHoverOptions {
  onEnter?: () => void;
  onLeave?: () => void;
}

export const createMouseHoverController = ({
  onEnter,
  onLeave,
}: MouseHoverOptions = {}) => {
  const controller = new Gtk.EventControllerMotion({
    propagationPhase: Gtk.PropagationPhase.CAPTURE,
  });

  if (onEnter) controller.connect("enter", onEnter);
  if (onLeave) controller.connect("leave", onLeave);

  return controller;
};

export interface ClickOptions {
  button?: number;
  onClick?: () => void;
  onRelease?: () => void;
}

export const createClickController = ({
  button = Gdk.BUTTON_PRIMARY,
  onClick,
  onRelease,
}: ClickOptions) => {
  const controller = new Gtk.GestureClick({
    propagationPhase: Gtk.PropagationPhase.CAPTURE,
    button,
  });

  if (onClick) controller.connect("pressed", onClick);
  if (onRelease) controller.connect("released", onRelease);

  return controller;
};
