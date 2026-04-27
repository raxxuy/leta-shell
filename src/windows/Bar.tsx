import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/ui/Window";
import { Exclusivity } from "@/enums";
import useBarProps from "@/hooks/ui/windows/useBarProps";
import BarModule from "@/modules/bar";

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  const { anchor, height } = useBarProps();

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
