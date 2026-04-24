import { For } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, PolicyType } from "@/enums";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import { usePictures } from "@/hooks/services/pictures/usePictures";
import WallpaperService from "@/services/wallpaper";
import ThumbnailButton from "./ThumbnailButton";

interface WallpaperSelectorProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperSelectorModule({
  gdkmonitor,
}: WallpaperSelectorProps) {
  const spacing = useSpacing();
  const pictures = usePictures();
  const wallpaperService = WallpaperService.get_default();
  const { width } = gdkmonitor.geometry;

  const onWallpaperSelected = (picture: string) => {
    wallpaperService.setWallpaper(gdkmonitor.connector, picture);
  };

  return (
    <box class="mx-4 my-2">
      <box class="rounded-2xl border border-blue-400/20 bg-zinc-950/95 p-3 shadow-md">
        <scrolledwindow
          class="rounded-xl"
          heightRequest={240}
          hscrollbarPolicy={PolicyType.EXTERNAL}
          kineticScrolling
          vscrollbarPolicy={PolicyType.NEVER}
          widthRequest={width * 0.95}
        >
          <box hexpand spacing={spacing.xl} valign={Align.CENTER}>
            <For each={pictures}>
              {(picture) => (
                <ThumbnailButton
                  onClick={() => onWallpaperSelected(picture)}
                  source={wallpaperService.getThumbnail(picture)}
                />
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </box>
  );
}
