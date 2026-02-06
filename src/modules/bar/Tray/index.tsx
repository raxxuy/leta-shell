import AstalTray from "gi://AstalTray";
import { createBinding, For } from "ags";
import { useGlobalConfig } from "@/hooks/useConfig";
import TrayItem from "./TrayItem";

export default function Tray() {
  const { spacing } = useGlobalConfig();
  const tray = AstalTray.get_default();
  const items = createBinding(
    tray,
    "items",
  )((items) => items.filter((item) => item?.gicon));

  return (
    <box
      spacing={spacing("small")}
      visible={items((items) => items.length > 0)}
    >
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
