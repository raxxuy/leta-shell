import { With } from "ags";
import Image from "@/components/ui/Image";
import { useWallpaperService } from "@/hooks/services/useWallpaperService";
import { cleanupWidget } from "@/lib/theme";

interface WallpaperModuleProps {
  connector: string;
  height: number;
  width: number;
}

export default function WallpaperModule({
  connector,
  width,
  height,
}: WallpaperModuleProps) {
  const { wallpaper } = useWallpaperService(connector);

  return (
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
  );
}
