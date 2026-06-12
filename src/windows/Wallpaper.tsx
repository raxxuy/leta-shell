import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity, Layer } from "@/enums";
import { useWallpaper } from "@/hooks/features/wallpaper/useWallpaper";
import WallpaperModule from "@/modules/wallpaper";
import WallpaperConfigProvider from "@/providers/WallpaperConfigProvider";

export default function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <WallpaperConfigProvider>
      {() => <WallpaperWindowInner gdkmonitor={gdkmonitor} />}
    </WallpaperConfigProvider>
  );
}

const WallpaperWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const {
    enabled: [enabled],
  } = useWallpaper();
  const { width, height } = gdkmonitor.geometry;
  const connector = gdkmonitor.connector as string;

  return (
    <Window
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.BACKGROUND}
      name="wallpaper"
      namespace="leta-shell"
      visible={enabled}
    >
      <WallpaperModule connector={connector} height={height} width={width} />
    </Window>
  );
};
