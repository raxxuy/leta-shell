import { With } from "ags";
import type { Gdk } from "ags/gtk4";
import Image from "@/components/ui/Image";
import { useWallpaper } from "@/hooks/services/wallpaper/useWallpaper";

interface WallpaperModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperModule({ gdkmonitor }: WallpaperModuleProps) {
  const wallpaper = useWallpaper(gdkmonitor.connector);
  const { width, height } = gdkmonitor.geometry;

  return (
    <With value={wallpaper}>
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
  );
}
