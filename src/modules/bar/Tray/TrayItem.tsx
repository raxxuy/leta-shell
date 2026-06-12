import type AstalTray from "gi://AstalTray";
import { createEffect } from "ags";
import type { Gtk } from "ags/gtk4";
import MenuButton from "@/components/MenuButton";
import { useTrayItem } from "@/hooks/features/tray/useTrayItem";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { scan } from "@/lib/theme";

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const pixelSize = usePixelSize();
  const { gicon, menuModel, actionGroup } = useTrayItem(item);

  const init = (self: Gtk.MenuButton) => {
    createEffect(() => self.insert_action_group("dbusmenu", actionGroup()));
    scan?.(self);
  };

  return (
    <MenuButton
      $={init}
      class="tray-item bar-menubutton"
      focusable={false}
      menuModel={menuModel}
    >
      <image
        gicon={gicon}
        pixelSize={pixelSize.sm}
        tooltipText={item.tooltip?.title ?? item.title}
      />
    </MenuButton>
  );
}
