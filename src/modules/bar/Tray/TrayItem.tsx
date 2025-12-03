import type AstalTray from "gi://AstalTray?version=0.1";
import { createBinding, onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { getConfig } from "@/lib/config";

const { icons } = getConfig("bar");

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const gicon = createBinding(item, "gicon");

  const init = (self: Gtk.MenuButton) => {
    const gesture = new Gtk.GestureClick({
      propagationPhase: Gtk.PropagationPhase.CAPTURE,
      button: Gdk.BUTTON_SECONDARY,
    });

    const gestureHandler = gesture.connect("pressed", () =>
      item.activate(0, 0),
    );

    self.menuModel = item.menuModel;
    self.add_controller(gesture);

    const itemHandler = item.connect("notify::action-group", () => {
      self.popover.insert_action_group("dbusmenu", item.actionGroup);
    });

    onCleanup(() => {
      item.disconnect(itemHandler);
      gesture.disconnect(gestureHandler);
    });
  };

  return (
    <menubutton class="tray-item" $={init}>
      <image
        class="tray-item-icon"
        pixelSize={icons.pixelSize.small}
        gicon={gicon}
      />
    </menubutton>
  );
}
