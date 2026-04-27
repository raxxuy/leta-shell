import Gtk from "gi://Gtk";
import { createClickOutside } from "@/lib/gtk";

export default function useClickOutside(
  root: Gtk.Widget,
  target: Gtk.Widget,
  onClickOutside: () => void,
) {
  const controller = new Gtk.GestureClick();

  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  const handler = createClickOutside(
    () => root,
    () => target,
    onClickOutside,
  );

  controller.connect("pressed", handler);

  root.add_controller(controller);

  return controller;
}
