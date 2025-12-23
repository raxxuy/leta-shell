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
      spacing={spacings.large}
      class="bg-background-dark/80"
      orientation={Orientation.VERTICAL}
    >
      <scrolledwindow
        minContentWidth={width}
        minContentHeight={height / 3.6}
        vscrollbarPolicy={PolicyType.NEVER}
        hscrollbarPolicy={PolicyType.ALWAYS}
      >
        <box spacing={spacings.larger} class="py-10">
          <For each={cachedPictures}>
            {(picture) => (
              <WallpaperItem
                src={picture.cached}
                width={width / 4}
                height={height / 4}
                onClicked={() => setWallpaper(picture.cached)}
              />
            )}
          </For>
        </box>
      </scrolledwindow>

      <box class="p-10 pt-5" halign={Align.CENTER} spacing={spacings.large}>
        <button
          label="Clear wallpaper"
          class="button border-2 bg-background px-4 py-2 font-bold text-base"
          cursor={CURSORS.pointer}
          onClicked={() => setWallpaper()}
        />
      </box>
    </box>
  );
}
