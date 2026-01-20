import AstalTray from "gi://AstalTray";
import { createBinding, For } from "ags";
import TrayItem from "@/modules/bar/Tray/TrayItem";
import ConfigManager from "@/services/configs";

export default function Tray() {
  const tray = AstalTray.get_default();
  const configManager = ConfigManager.get_default();
  const spacings = configManager.bind("global", "spacings");
  const items = createBinding(
    tray,
    "items",
  )((items) => items.filter((item) => item?.gicon));

  return (
    <box
      spacing={spacings((s) => s.small)}
      visible={items((items) => items.length > 0)}
    >
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
