import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Layer } from "@/enums";
import useWallpaperProps from "@/hooks/ui/windows/useWallpaperProps";
import WallpaperModule from "@/modules/wallpaper";

export default function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  const { enabled, connector, width, height } = useWallpaperProps(gdkmonitor);

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
      <WallpaperModule connector={connector} height={height} width={width} />
    </window>
  );
}
