import { For } from "ags";
import { Align } from "@/enums";
import useSpacing from "@/hooks/services/config/useSpacing";
import useTray from "@/hooks/system/useTray";
import TrayItem from "./TrayItem";

export default function Tray() {
  const spacing = useSpacing();
  const { items, hasItems } = useTray();

  return (
    <box spacing={spacing.sm} valign={Align.CENTER} visible={hasItems}>
      <For each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
