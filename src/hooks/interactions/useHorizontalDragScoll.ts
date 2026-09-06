import { createState, onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";

import { createDragController } from "@/lib/gtk/controllers";

export const useHorizontalDragScroll = (
  sensitivity = 1,
  onDragChange?: (dragging: boolean) => void,
) => {
  const [dragged, setDragged] = createState(false);

  let controller: Gtk.GestureDrag | null = null;
  let widget: Gtk.ScrolledWindow | null = null;
  let lastX = 0;

  const setDragging = (value: boolean) => {
    setDragged(value);
    onDragChange?.(value);
  };

  const ref = (next: Gtk.ScrolledWindow) => {
    widget = next;

    controller = createDragController({
      onBegin: () => {
        lastX = 0;
        setDragging(false);
      },
      onUpdate: (_, __, offsetX) => {
        const delta = Math.round((offsetX - lastX) * sensitivity);
        if (!delta) return;
        lastX = offsetX;
        if (Math.abs(delta) > 1) setDragging(true);
        next.hadjustment.value -= delta;
      },
      onEnd: () => {
        lastX = 0;
        setDragging(false);
      },
    });

    next.add_controller(controller);
  };

  onCleanup(() => {
    if (widget && controller) {
      widget.remove_controller(controller);
    }
  });

  return { ref, dragged };
};
