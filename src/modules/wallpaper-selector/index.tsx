import { For } from "ags";
import type { Gdk } from "ags/gtk4";
import ImageButton from "@/components/ui/ImageButton";
import { usePictures } from "@/hooks/usePictures";
import WallpaperService from "@/services/wallpaper";

interface WallpaperSelectorProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperSelectorModule({
  gdkmonitor,
}: WallpaperSelectorProps) {
  const pictures = usePictures();
  const wallpaperService = WallpaperService.get_default();

  const onWallpaperSelected = (picture: string) => {
    wallpaperService.setWallpaper(gdkmonitor.connector, picture);
  };

  return (
    <box>
      <For each={pictures}>
        {(picture) => (
          <ImageButton
            file
            heightRequest={400}
            onClicked={() => onWallpaperSelected(picture)}
            src={picture}
            widthRequest={400}
          />
        )}
      </For>
    </box>
  );
}
