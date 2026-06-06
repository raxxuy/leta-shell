import { For } from "ags";
import { Align } from "@/enums";
import useTray from "@/hooks/features/tray/useTray";
import { useSpacing } from "@/hooks/services/useSpacing";
import { cleanupWidget } from "@/lib/theme";
import TrayItem from "./TrayItem";

export default function Tray() {
  const spacing = useSpacing();
  const { items, hasItems } = useTray();

  return (
    <box spacing={spacing.sm} valign={Align.CENTER} visible={hasItems}>
      <For cleanup={cleanupWidget} each={items} id={(item) => item.id}>
        {(item) => <TrayItem item={item} />}
      </For>
    </box>
  );
}
