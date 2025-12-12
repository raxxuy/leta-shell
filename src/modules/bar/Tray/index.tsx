import AstalTray from "gi://AstalTray";
import { createBinding, For } from "ags";
import { getConfig } from "@/lib/config";
import TrayItem from "@/modules/bar/Tray/TrayItem";

const { spacings } = getConfig("global");

export default function Tray() {
  const tray = AstalTray.get_default();
  const items = createBinding(
    tray,
    "items",
  )((items) => items.filter((item) => item?.gicon));

  return (
    <box
      class="tray"
      spacing={spacings.medium}
      visible={items((items) => items.length > 0)}
    >
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
