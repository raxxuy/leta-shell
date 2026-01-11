import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity } from "@/enums";
import { getConfig } from "@/lib/config";
import BarModule from "@/modules/bar";
import Window from "@/widgets/Window";

const { window } = getConfig("bar");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <Window
      anchor="top-full"
      application={app}
      class="bar"
      defaultHeight={window.defaultHeight + (window.floating ? 16 : 0)}
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
