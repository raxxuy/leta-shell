import { onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";

type PopoverButtonProps = JSX.IntrinsicElements["button"] & {
  primary?: boolean;
};

export default function PopoverButton({
  primary = false,
  children,
  ...props
}: PopoverButtonProps) {
  const init = (self: Gtk.Button) => {
    const popover = self.get_first_child()?.get_last_child() as Gtk.Popover;

    const gesture = new Gtk.GestureClick({
      propagationPhase: Gtk.PropagationPhase.CAPTURE,
      button: primary ? Gdk.BUTTON_PRIMARY : Gdk.BUTTON_SECONDARY,
    });

    const gestureHandler = gesture.connect("pressed", () => {
      popover.show();
    });

    self.add_controller(gesture);

    onCleanup(() => {
      gesture.disconnect(gestureHandler);
    });
  };

  return (
    <button $={init} {...props}>
      <box>{children}</box>
    </button>
  );
}
