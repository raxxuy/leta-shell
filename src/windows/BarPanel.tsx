import type { Gdk } from "ags/gtk4";
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
      anchor="top-full"
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.EXCLUSIVE}
      defaultHeight={configs.bar.window.defaultHeight}
    >
      <BarModule />
    </Window>
  );
}
