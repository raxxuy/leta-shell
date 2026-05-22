import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window, { type WindowProps } from "@/components/ui/Window";
import { Exclusivity } from "@/enums";
import useBarProps from "@/hooks/ui/windows/useBarProps";
import BarModule from "@/modules/bar";

const WINDOW_PROPS = {
  application: app,
  exclusivity: Exclusivity.EXCLUSIVE,
  name: "bar",
  namespace: "leta-shell",
  visible: true,
} satisfies WindowProps;

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  const { anchor, height } = useBarProps();

  return (
    <Window
      anchor={anchor}
      defaultHeight={height}
      gdkmonitor={gdkmonitor}
      {...WINDOW_PROPS}
    >
      <BarModule />
    </Window>
  );
}
