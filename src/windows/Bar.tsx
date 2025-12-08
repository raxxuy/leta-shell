import type { Gdk } from "ags/gtk4";
import { Exclusivity } from "@/enums";
import { getConfig } from "@/lib/config";
import BarModule from "@/modules/bar";
import Window from "@/widgets/Window";

const { window } = getConfig("bar");

export default function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <Window
      visible
      name="bar"
      class="bar"
      anchor="top-full"
      namespace="leta-shell"
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.EXCLUSIVE}
      defaultHeight={window.defaultHeight}
    >
      <BarModule />
    </Window>
  );
}
