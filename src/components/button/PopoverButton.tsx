import { onCleanup } from "ags";
import { Gdk, type Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";
import { addGestureClick } from "@/utils";
import Button from "./Button";

type PopoverButtonProps = JSX.IntrinsicElements["button"] & {
  initCss?: boolean;
  primary?: boolean;
  onClicked: (self: Gtk.Button) => void;
};

export default function PopoverButton({
  primary = false,
  onClicked,
  children,
  ...props
}: PopoverButtonProps) {
  const init = (self: Gtk.Button) => {
    const popover = self.get_first_child()?.get_last_child() as Gtk.Popover;
    if (!popover) return;

    const popoverButton = primary ? Gdk.BUTTON_PRIMARY : Gdk.BUTTON_SECONDARY;
    const clickedButton = primary ? Gdk.BUTTON_SECONDARY : Gdk.BUTTON_PRIMARY;

    const popoverCleanup = addGestureClick(self, popoverButton, () => {
      popover.show();
      self.set_state_flags(StateFlags.SELECTED, false);
    });

    const clickedCleanup = addGestureClick(self, clickedButton, () =>
      onClicked(self),
    );

    const closeHandler = popover.connect("closed", () =>
      self.unset_state_flags(StateFlags.SELECTED),
    );

    onCleanup(() => {
      popoverCleanup();
      clickedCleanup();
      popover.disconnect(closeHandler);
    });
  };

  return (
    <Button $={init} {...props}>
      <box>{children}</box>
    </Button>
  );
}
