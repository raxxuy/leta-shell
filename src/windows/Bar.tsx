import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/ui/Window";
import { Exclusivity } from "@/enums";
import { useBar } from "@/hooks/features/bar/useBar";
import BarModule from "@/modules/bar";
import BarConfigProvider from "@/providers/BarConfigProvider";

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <BarConfigProvider>
      {() => <BarWindowInner gdkmonitor={gdkmonitor} />}
    </BarConfigProvider>
  );
}

const BarWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const {
    anchor,
    height: [height],
  } = useBar();

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
};
