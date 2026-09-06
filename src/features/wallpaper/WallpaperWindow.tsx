import { With } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

import Image from "@/components/Image";
import Window from "@/components/Window";
import { cleanupWidget } from "@/lib/theme/plugin";
import { useWallpaper, WallpaperProvider } from "@/providers/WallpaperProvider";

const WallpaperWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const { enabled, getWallpaper } = useWallpaper();
  const { width, height } = gdkmonitor.geometry;

  const wallpaper = getWallpaper(gdkmonitor.connector ?? "");

  return (
    <Window
      anchor="center"
      application={app}
      exclusivity="ignore"
      gdkmonitor={gdkmonitor}
      layer="background"
      name="wallpaper"
      namespace="leta-shell"
      visible={enabled}
    >
      <With cleanup={cleanupWidget} value={wallpaper}>
        {(wallpaper) =>
          wallpaper && (
            <Image
              file
              heightRequest={height}
              src={wallpaper}
              widthRequest={width}
            />
          )
        }
      </With>
    </Window>
  );
};

export default function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <WallpaperProvider>
      {() => <WallpaperWindowInner gdkmonitor={gdkmonitor} />}
    </WallpaperProvider>
  );
}
