import { createBinding, For } from "ags";
import type { Gdk } from "ags/gtk4";
import Button from "@/components/button/Button";
import { CURSORS } from "@/constants";
import { Align, Orientation, PolicyType } from "@/enums";
import WallpaperItem from "@/modules/wallpapers/WallpaperItem";
import ConfigManager from "@/services/configs";
import Wallpaper from "@/services/wallpaper";

interface WallpaperManagerProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperManagerModule({
  gdkmonitor,
}: WallpaperManagerProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const spacings = ConfigManager.bind("global", "spacings");
  const cachedPictures = createBinding(wallpaper, "cachedPictures");

  wallpaper.setMonitorDimensions(width, height);

  const setWallpaper = (picture: string = "", full?: boolean) => {
    wallpaper.setSource(picture, full);
  };

  return (
    <box
      class="bg-background-dark/80 shadow-2xl/30"
      orientation={Orientation.VERTICAL}
      spacing={spacings((s) => s.large)}
      valign={Align.CENTER}
    >
      <scrolledwindow
        hscrollbarPolicy={PolicyType.ALWAYS}
        minContentHeight={height / 3.6}
        minContentWidth={width}
        vscrollbarPolicy={PolicyType.NEVER}
      >
        <box class="py-10" spacing={spacings((s) => s.larger)}>
          <For each={cachedPictures}>
            {(picture) => (
              <WallpaperItem
                height={height / 4}
                onClicked={() => setWallpaper(picture.cached)}
                onSecondaryClicked={() => setWallpaper(picture.original, true)}
                src={picture.cached}
                width={width / 4}
              />
            )}
          </For>
        </box>
      </scrolledwindow>

      <box
        class="p-10 pt-5"
        halign={Align.CENTER}
        spacing={spacings((s) => s.large)}
      >
        <Button
          canFocus={false}
          class="border-2 border-background-lighter bg-background-light/60 px-4 py-2 font-bold text-base shadow-sm"
          cursor={CURSORS.pointer}
          label="Clear wallpaper"
          onClicked={() => setWallpaper()}
        />
      </box>
    </box>
  );
}
