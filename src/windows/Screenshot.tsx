import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity, Keymode, Layer } from "@/enums";
import ScreenshotModule from "@/modules/screenshot";

export default function ScreenshotWindow(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.geometry;

  return (
    <Window
      anchor="center"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.NONE}
      layer={Layer.OVERLAY}
      name="screenshot"
      namespace="leta-shell-no-blur"
      visible={false}
    >
      <ScreenshotModule height={height} width={width} />
    </Window>
  );
}
