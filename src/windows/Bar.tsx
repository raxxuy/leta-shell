import { createComputed } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity } from "@/enums";
import BarModule from "@/modules/bar";
import ConfigManager from "@/services/configs";
import Window from "@/widgets/Window";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const configManager = ConfigManager.get_default();
  const window = configManager.bind("bar", "window");

  const defaultHeight = createComputed(() => {
    return window().defaultHeight + (window().floating ? 16 : 0);
  });

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
