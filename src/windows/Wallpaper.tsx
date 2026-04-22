import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import { useConfig } from "@/hooks/useConfig";
import WallpaperModule from "@/modules/wallpaper";

export default function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  const [enabled] = useConfig("wallpaper", "enabled");

  return (
    <window
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.BACKGROUND}
      name="wallpaper"
      namespace="leta-shell"
      visible={enabled}
    >
      <WallpaperModule gdkmonitor={gdkmonitor} />
    </window>
  );
}
