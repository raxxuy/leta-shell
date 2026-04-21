import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import WallpaperSelectorModule from "@/modules/wallpaper-selector";

export default function WallpaperSelectorWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.OVERLAY}
      name="wallpaper-selector"
      namespace="leta-shell"
    >
      <WallpaperSelectorModule gdkmonitor={gdkmonitor} />
    </window>
  );
}
