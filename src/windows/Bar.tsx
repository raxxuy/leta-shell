import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity } from "@/enums";
import { useConfig } from "@/hooks/useConfig";

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  const [position] = useConfig("bar", "position");
  const [height] = useConfig("bar", "height");

  return (
    <Window
      anchor={position}
      application={app}
      defaultHeight={height}
      exclusivity={Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      name="bar"
      namespace="leta-shell"
      visible
    >
      hello
    </Window>
  );
}
