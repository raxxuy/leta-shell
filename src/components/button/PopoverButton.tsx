import { onCleanup } from "ags";
import { Gdk, type Gtk } from "ags/gtk4";
import { StateFlags } from "@/enums";
import { addGestureClick } from "@/lib/utils";
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

    // Add gesture for popover
    const popoverCleanup = addGestureClick(
      self,
      primary ? Gdk.BUTTON_PRIMARY : Gdk.BUTTON_SECONDARY,
      () => {
        popover.show();
        self.set_state_flags(StateFlags.SELECTED, false);
      },
    );

    // Add gesture for clicked handler
    const clickedCleanup = addGestureClick(
      self,
      primary ? Gdk.BUTTON_SECONDARY : Gdk.BUTTON_PRIMARY,
      () => onClicked(self),
    );

    // Handle popover close
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
