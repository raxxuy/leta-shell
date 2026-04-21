import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import WallpaperModule from "@/modules/wallpaper";

export default function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.BACKGROUND}
      name="wallpaper"
      namespace="leta-shell"
      visible
    >
      <WallpaperModule gdkmonitor={gdkmonitor} />
    </window>
  );
}
