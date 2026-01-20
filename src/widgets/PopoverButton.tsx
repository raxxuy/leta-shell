import { onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";

type PopoverButtonProps = JSX.IntrinsicElements["button"] & {
  primary?: boolean;
  signal?: "pressed" | "released";
  onClicked: (self: Gtk.Button) => void;
};

export default function PopoverButton({
  primary = false,
  signal = "pressed",
  onClicked,
  children,
  ...props
}: PopoverButtonProps) {
  const init = (self: Gtk.Button) => {
    const popover = self.get_first_child()?.get_last_child() as Gtk.Popover;

    const popoverGesture = new Gtk.GestureClick({
      propagationPhase: Gtk.PropagationPhase.CAPTURE,
      button: primary ? Gdk.BUTTON_PRIMARY : Gdk.BUTTON_SECONDARY,
    });

    const clickedGesture = new Gtk.GestureClick({
      propagationPhase: Gtk.PropagationPhase.CAPTURE,
      button: primary ? Gdk.BUTTON_SECONDARY : Gdk.BUTTON_PRIMARY,
    });

    const clickedHandler = clickedGesture.connect(signal, () =>
      onClicked(self),
    );

    const popoverHandler = popoverGesture.connect(signal, () => {
      popover.show();
      self.set_state_flags(StateFlags.SELECTED, false);
    });

    popover.connect("closed", () => {
      self.unset_state_flags(StateFlags.SELECTED);
    });

    self.add_controller(popoverGesture);
    self.add_controller(clickedGesture);

    onCleanup(() => {
      popoverGesture.disconnect(popoverHandler);
      clickedGesture.disconnect(clickedHandler);
    });
  };

  return (
    <button $={init} {...props}>
      <box>{children}</box>
    </button>
  );
}
