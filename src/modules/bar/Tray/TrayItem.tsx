import type AstalTray from "gi://AstalTray";
import { createBinding } from "ags";
import type { Gtk } from "ags/gtk4";
import MenuButton from "@/components/ui/MenuButton";
import { usePixelSize } from "@/hooks/services/config/usePixelSize";
import { loadClasses } from "@/lib/theme";

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const pixelSize = usePixelSize();

  const gicon = createBinding(item, "gicon");

  const init = (self: Gtk.MenuButton) => {
    self.set_menu_model(item.menuModel ?? null);
    self.insert_action_group("dbusmenu", item.actionGroup ?? null);

    loadClasses(TrayItem)(self);
  };

  return (
    <MenuButton
      $={init}
      class="tray-item rounded-lg px-1 transition-colors checked:bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-700"
      focusable={false}
    >
      <image
        gicon={gicon}
        pixelSize={pixelSize.sm}
        tooltipText={item.tooltip?.title ?? item.title}
      />
    </MenuButton>
  );
}
