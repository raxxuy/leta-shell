import { type Accessor, onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { DragAction } from "@/enums";

export const createDragAndDrop = <T extends { id: string }>(
  entries: Accessor<T[]>,
  setEntries: (next: T[]) => void,
) => {
  const move = (fromId: string, toId: string) => {
    const list = entries.peek();
    const next = [...list];

    const from = next.findIndex((e) => e.id === fromId);
    const to = next.findIndex((e) => e.id === toId);

    if (from === -1 || to === -1) {
      return;
    }

    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setEntries(next);
  };

  const makeDraggable = (id: string) => (widget: Gtk.Widget) => {
    const source = new Gtk.DragSource({
      actions: DragAction.MOVE,
    });

    source.connect("prepare", (self) => {
      self.set_icon(Gtk.WidgetPaintable.new(widget), 0, 0);
      return Gdk.ContentProvider.new_for_value(id);
    });

    widget.add_controller(source);

    const target = new Gtk.DropTarget({
      actions: DragAction.MOVE,
      formats: Gdk.ContentFormats.new_for_gtype(String.$gtype),
    });

    target.connect("drop", (_, value) => {
      move(value as string, id);

      return true;
    });

    widget.add_controller(target);

    onCleanup(() => {
      widget.remove_controller(source);
      widget.remove_controller(target);
    });
  };

  return {
    move,
    makeDraggable,
  };
};
