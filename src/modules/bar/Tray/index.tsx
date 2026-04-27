import { For } from "ags";
import useSpacing from "@/hooks/services/config/useSpacing";
import useTray from "@/hooks/system/useTray";
import TrayItem from "./TrayItem";

export default function Tray() {
  const { items, hasItems } = useTray();
  const spacing = useSpacing();

  return (
    <box class="my-2" spacing={spacing.sm} visible={hasItems}>
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
