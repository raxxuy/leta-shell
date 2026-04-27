import { Gtk } from "ags/gtk4";
import { createEscape } from "@/lib/gtk";

export default function useEscape(widget: Gtk.Widget, onEscape: () => void) {
  const controller = new Gtk.EventControllerKey();

  controller.set_propagation_phase(Gtk.PropagationPhase.CAPTURE);

  const handler = createEscape(onEscape);

  controller.connect("key-pressed", handler);

  widget.add_controller(controller);

  return controller;
}
