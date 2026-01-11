import type AstalTray from "gi://AstalTray";
import { createBinding, onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import { getConfig } from "@/lib/config";
import MenuButton from "@/widgets/MenuButton";

const { icons } = getConfig("global");

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const gicon = createBinding(item, "gicon");

  const buttonInit = (self: Gtk.MenuButton) => {
    const gesture = new Gtk.GestureClick({
      propagationPhase: Gtk.PropagationPhase.CAPTURE,
      button: Gdk.BUTTON_SECONDARY,
    });

    const gestureHandler = gesture.connect("pressed", () => {
      item.activate(0, 0);
    });

    self.add_controller(gesture);

    onCleanup(() => {
      gesture.disconnect(gestureHandler);
    });
  };

  const popoverInit = (self: Gtk.PopoverMenu) => {
    self.get_child()?.set_css_classes("container p-3".split(" "));

    const itemHandler = item.connect("notify::action-group", () => {
      self.insert_action_group("dbusmenu", item.actionGroup);
    });

    onCleanup(() => {
      item.disconnect(itemHandler);
    });
  };

  return (
    <MenuButton $={buttonInit} class="button">
      <image
        gicon={gicon}
        pixelSize={icons.pixelSize.small}
        tooltipText={item.tooltip?.title ?? item.title}
      />
      <Gtk.PopoverMenu $={popoverInit} menuModel={item.menuModel} />
    </MenuButton>
  );
}
