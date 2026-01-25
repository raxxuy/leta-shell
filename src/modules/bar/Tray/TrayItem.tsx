import type AstalTray from "gi://AstalTray";
import { createBinding, onCleanup } from "ags";
import { Gdk, Gtk } from "ags/gtk4";
import MenuButton from "@/components/button/MenuButton";
import { findWidget } from "@/lib/utils";
import ConfigManager from "@/services/configs";

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const icons = ConfigManager.bind("global", "icons");
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
    const container = findWidget(self, (w) => w.cssName === "scrolledwindow");
    container?.set_css_classes([
      "rounded-2xl",
      "border-2",
      "border-background-lighter",
      "bg-background-dark",
      "p-3",
      "shadow-md",
      "m-[5px_10px_15px]",
    ]);

    const itemHandler = item.connect("notify::action-group", () => {
      self.insert_action_group("dbusmenu", item.actionGroup);
    });

    onCleanup(() => {
      item.disconnect(itemHandler);
    });
  };

  return (
    <MenuButton $={buttonInit}>
      <image
        gicon={gicon}
        pixelSize={icons((i) => i.pixelSize.small)}
        tooltipText={item.tooltip?.title ?? item.title}
      />
      <Gtk.PopoverMenu $={popoverInit} menuModel={item.menuModel} />
    </MenuButton>
  );
}
