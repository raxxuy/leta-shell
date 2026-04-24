import { useSpacing } from "@/hooks/services/config/useSpacing";
import CenterNotch from "./CenterNotch";
import Clock from "./Clock";
import Tray from "./Tray";
import Workspaces from "./Workspaces";

export default function BarModule() {
  const spacing = useSpacing();

  return (
    <centerbox class="mb-0.5 px-4">
      <box
        $type="start"
        class="rounded-b-2xl border border-(--tertiary)/20 border-t-0 bg-zinc-950/95 px-4 shadow-md"
        spacing={spacing.xl}
      >
        <Workspaces />
        <Tray />
      </box>
      <box $type="center">
        <CenterNotch />
      </box>
      <box
        $type="end"
        class="rounded-b-2xl border border-(--tertiary)/20 border-t-0 bg-zinc-950/95 px-4 shadow-md"
      >
        <Clock />
      </box>
    </centerbox>
  );
}
