import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity } from "@/enums";
import { useBarConfig } from "@/hooks/useConfig";
import BarModule from "@/modules/bar";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { window } = useBarConfig();
  const defaultHeight = window(
    (w) => w.defaultHeight + (w.floating ? 16 : 0) + (w.border ? 4 : 0),
  );
  const anchor = window((w) =>
    w.anchor === "top" ? "top-full" : "bottom-full",
  );

  return (
    <Window
      anchor={anchor}
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
