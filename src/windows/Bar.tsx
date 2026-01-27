import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity } from "@/enums";
import BarModule from "@/modules/bar";
import ConfigService from "@/services/config";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const window = ConfigService.bind("bar", "window");
  const defaultHeight = window((w) => w.defaultHeight + (w.floating ? 16 : 0));

  return (
    <Window
      anchor="top-full"
      application={app}
      class="bar"
      defaultHeight={defaultHeight}
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
