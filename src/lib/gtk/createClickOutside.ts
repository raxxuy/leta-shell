import Graphene from "gi://Graphene";
import type Gtk from "gi://Gtk";

export const createClickOutside = (
  getRoot: () => Gtk.Widget,
  getTarget: () => Gtk.Widget,
  onClickOutside: () => void,
) => {
  return (_: Gtk.GestureClick, __: unknown, x: number, y: number) => {
    const root = getRoot();
    const target = getTarget();

    const [, rect] = target.compute_bounds(root);
    const point = new Graphene.Point({ x, y });

    if (!rect.contains_point(point)) {
      onClickOutside();
    }
  };
};
