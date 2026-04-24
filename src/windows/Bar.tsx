import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/ui/Window";
import { Exclusivity } from "@/enums";
import { useConfig } from "@/hooks/services/config/useConfig";
import BarModule from "@/modules/bar";

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  const [position] = useConfig("bar", "position");
  const [height] = useConfig("bar", "height");

  const anchor = position((p) => (p === "top" ? "top-full" : "bottom-full"));

  return (
    <Window
      anchor={anchor}
      application={app}
      defaultHeight={height}
      exclusivity={Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      name="bar"
      namespace="leta-shell"
      visible
    >
      <BarModule />
    </Window>
  );
}
