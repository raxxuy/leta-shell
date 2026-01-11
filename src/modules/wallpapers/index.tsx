import { createBinding, For } from "ags";
import type { Gdk } from "ags/gtk4";
import { CURSORS } from "@/constants";
import { Align, Orientation, PolicyType } from "@/enums";
import { getConfig } from "@/lib/config";
import WallpaperItem from "@/modules/wallpapers/WallpaperItem";
import Wallpaper from "@/services/wallpaper";

const { spacings } = getConfig("global");

interface WallpaperManagerProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperManagerModule({
  gdkmonitor,
}: WallpaperManagerProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();
  const cachedPictures = createBinding(wallpaper, "cachedPictures");

  wallpaper.setMonitorDimensions(width, height);

  const setWallpaper = (picture?: string) => {
    wallpaper.source = picture ?? "";
  };

  return (
    <box
      class="bg-background-dark/80 shadow"
      orientation={Orientation.VERTICAL}
      spacing={spacings.large}
    >
      <scrolledwindow
        hscrollbarPolicy={PolicyType.ALWAYS}
        minContentHeight={height / 3.6}
        minContentWidth={width}
        vscrollbarPolicy={PolicyType.NEVER}
      >
        <box class="py-10" spacing={spacings.larger}>
          <For each={cachedPictures}>
            {(picture) => (
              <WallpaperItem
                height={height / 4}
                onClicked={() => setWallpaper(picture.cached)}
                src={picture.cached}
                width={width / 4}
              />
            )}
          </For>
        </box>
      </scrolledwindow>

      <box class="p-10 pt-5" halign={Align.CENTER} spacing={spacings.large}>
        <button
          canFocus={false}
          class="button border-2 border-background-lighter bg-background-light/60 px-4 py-2 font-bold text-base shadow"
          cursor={CURSORS.pointer}
          label="Clear wallpaper"
          onClicked={() => setWallpaper()}
        />
      </box>
    </box>
  );
}
