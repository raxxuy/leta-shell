import type AstalTray from "gi://AstalTray";
import { createBinding, onCleanup } from "ags";
import { Gdk, type Gtk } from "ags/gtk4";
import { MenuButton } from "@/components/button";
import { useGlobalConfig } from "@/hooks/useConfig";
import { loadClasses } from "@/lib/styles";
import { addGestureClick, findWidget } from "@/utils";

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

const CONTAINER_STYLES = [
  "rounded-2xl",
  "border-2",
  "border-primary",
  "bg-background-dark",
  "p-3",
  "shadow-md",
  "m-[5px_10px_15px]",
];

export default function TrayItem({ item }: TrayItemProps) {
  const { iconSize } = useGlobalConfig();
  const gicon = createBinding(item, "gicon");

  const init = (self: Gtk.MenuButton) => {
    const cleanup = addGestureClick(self, Gdk.BUTTON_SECONDARY, () => {
      item.activate(0, 0);
    });

    onCleanup(cleanup);

    const menuModel = item.menuModel;
    const actionGroup = item.actionGroup;

    if (!menuModel || menuModel.get_n_items() < 1) {
      self.set_menu_model(null);
      self.insert_action_group("dbusmenu", null);
      return;
    }

    self.set_menu_model(menuModel);
    self.insert_action_group("dbusmenu", actionGroup);

    const container = findWidget(self, (w) => w.cssName === "scrolledwindow");

    if (container) {
      container.set_css_classes(CONTAINER_STYLES);
      container._init(loadClasses({ name: "trayItem" }));
    }
  };

  return (
    <MenuButton $={init}>
      <image
        class="w-6"
        gicon={gicon}
        pixelSize={iconSize("small")}
        tooltipText={item.tooltip?.title ?? item.title}
      />
    </MenuButton>
  );
}
