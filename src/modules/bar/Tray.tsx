import AstalTray from "gi://AstalTray";
import { createBinding, For, onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { getConfig } from "@/lib/config";

const { icons, spacings } = getConfig("bar");

export default function Tray() {
  const tray = AstalTray.get_default();
  const items = createBinding(tray, "items").as((items) =>
    items.filter((item) => item?.gicon),
  );

  const init = (self: Gtk.MenuButton, item: AstalTray.TrayItem) => {
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
    <box
      class="tray"
      spacing={spacings.medium}
      visible={items((items) => items.length > 0)}
    >
      <For each={items} id={(item) => item.id}>
        {(item) => (
          <menubutton class="tray-item" $={(self) => init(self, item)}>
            <image
              class="tray-item-icon"
              pixelSize={icons.pixelSize.small}
              gicon={createBinding(item, "gicon")}
            />
          </menubutton>
        )}
      </For>
    </box>
  );
}
