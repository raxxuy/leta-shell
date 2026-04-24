import { For } from "ags";
import { useTray } from "@/hooks/astal/useTray";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import TrayItem from "./TrayItem";

export default function Tray() {
  const items = useTray();
  const spacing = useSpacing();

  const itemsVisible = items((items) => items.length > 0);

  return (
    <box class="my-2" spacing={spacing.sm} visible={itemsVisible}>
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
