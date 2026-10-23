import type AstalTray from "gi://AstalTray";

import { createEffect } from "ags";
import type { Gtk } from "ags/gtk4";

import MenuButton from "@/components/MenuButton";
import { createBindings } from "@/lib/binding";
import { scan } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";

interface TrayItemProps {
  item: AstalTray.TrayItem;
}

export default function TrayItem({ item }: TrayItemProps) {
  const { pixelSize } = useTheme();

  const { gicon, menuModel, actionGroup } = createBindings(item, {
    gicon: true,
    menuModel: true,
    actionGroup: true,
  });

  const init = (self: Gtk.MenuButton) => {
    createEffect(() => self.insert_action_group("dbusmenu", actionGroup()));
    scan?.(self);
  };

  return (
    <MenuButton
      $={init}
      class="tray-button rounded-lg outline outline-transparent transition-all hover:bg-white/5 active:bg-white/10 active:outline-white/10"
      focusable={false}
      menuModel={menuModel}
    >
      <image
        class="min-h-6.5 min-w-6.5"
        gicon={gicon}
        pixelSize={pixelSize.md}
        tooltipText={item.tooltip?.title ?? item.title}
      />
    </MenuButton>
  );
}
