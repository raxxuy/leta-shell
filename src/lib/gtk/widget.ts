import type { Gtk } from "ags/gtk4";

export const findWidget = (
  widget: Gtk.Widget,
  predicate: (widget: Gtk.Widget) => boolean,
  mode: "bfs" | "dfs" = "dfs",
): Gtk.Widget | null => {
  if (mode === "dfs") return dfs(widget, predicate);
  return bfs(widget, predicate);
};

const dfs = (
  widget: Gtk.Widget,
  predicate: (widget: Gtk.Widget) => boolean,
): Gtk.Widget | null => {
  if (predicate(widget)) return widget;

  const children = widget.observe_children();

  for (let i = 0; i < children.get_n_items(); i++) {
    const found = dfs(children.get_item(i) as Gtk.Widget, predicate);
    if (found) return found;
  }

  return null;
};

const bfs = (
  widget: Gtk.Widget,
  predicate: (widget: Gtk.Widget) => boolean,
): Gtk.Widget | null => {
  const queue: Gtk.Widget[] = [widget];

  while (queue.length) {
    const current = queue.shift();

    if (!current) continue;
    if (predicate(current)) return current;

    const children = current.observe_children();

    for (let i = 0; i < children.get_n_items(); i++) {
      queue.push(children.get_item(i) as Gtk.Widget);
    }
  }

  return null;
};
