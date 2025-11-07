import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity } from "@/enums";
import { configs } from "@/lib/config";
import BarModule from "@/modules/bar";
import Window from "@/widgets/Window";

export default function BarPanel(gdkmonitor: Gdk.Monitor) {
  return (
    <Window
      visible
      name="bar"
      class="bar"
      anchor="TOP_FULL"
      application={app}
      defaultHeight={configs.bar.window.defaultHeight}
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.EXCLUSIVE}
    >
      <BarModule />
    </Window>
  );
}
