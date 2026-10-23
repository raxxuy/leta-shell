import AstalTray from "gi://AstalTray";

import { For } from "ags";

import { Align } from "@/enums";
import { createBindings } from "@/lib/binding";
import { cleanupWidget } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";
import TrayItem from "./TrayItem";

export default function Tray() {
  const { spacing } = useTheme();
  const tray = AstalTray.get_default();

  const { items } = createBindings(tray, {
    items: true,
  });

  const hasItems = items((i) => i.length > 0);

  return (
    <box spacing={spacing.sm} valign={Align.CENTER} visible={hasItems}>
      <For cleanup={cleanupWidget} each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
