import type { Gtk } from "ags/gtk4";

export const findWidget = <T extends Gtk.Widget>(
  widget: Gtk.Widget,
  predicate: (widget: Gtk.Widget) => boolean,
  mode: "bfs" | "dfs" = "dfs",
): T | null => {
  if (mode === "dfs") return dfs(widget as T, predicate);
  return bfs(widget as T, predicate);
};

const dfs = <T extends Gtk.Widget>(
  widget: T,
  predicate: (widget: T) => boolean,
): T | null => {
  if (predicate(widget)) return widget;

  const children = widget.observe_children();

  for (let i = 0; i < children.get_n_items(); i++) {
    const found = dfs(children.get_item(i) as T, predicate);
    if (found) return found;
  }

  return null;
};

const bfs = <T extends Gtk.Widget>(
  widget: T,
  predicate: (widget: T) => boolean,
): T | null => {
  const queue: T[] = [widget];

  while (queue.length) {
    const current = queue.shift();

    if (!current) continue;
    if (predicate(current)) return current;

    const children = current.observe_children();

    for (let i = 0; i < children.get_n_items(); i++) {
      queue.push(children.get_item(i) as T);
    }
  }

  return null;
};
