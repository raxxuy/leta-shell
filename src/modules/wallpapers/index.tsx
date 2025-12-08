import { createBinding, For } from "ags";
import type { Gdk } from "ags/gtk4";
import { Align, Orientation, PolicyType } from "@/enums";
import { getConfig } from "@/lib/config";
import WallpaperItem from "@/modules/wallpapers/WallpaperItem";
import Wallpaper from "@/services/wallpaper";

const { spacing, list } = getConfig("wallpapers").main;

interface WallpaperManagerProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperManagerModule({
  gdkmonitor,
}: WallpaperManagerProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const wallpaper = Wallpaper.get_default();

  // Set monitor dimensions for proper scaling
  wallpaper.setMonitorDimensions(width, height);

  const cachedPictures = createBinding(wallpaper, "cachedPictures");

  const setWallpaper = (picture?: string) => {
    wallpaper.source = picture ?? "";
  };

  return (
    <box
      spacing={spacing}
      class="wallpapers-main"
      orientation={Orientation.VERTICAL}
    >
      <scrolledwindow
        class="wallpapers-scrolledwindow"
        minContentWidth={list.width}
        minContentHeight={list.height}
        vscrollbarPolicy={PolicyType.NEVER}
        hscrollbarPolicy={PolicyType.ALWAYS}
      >
        <box spacing={list.spacing}>
          <For each={cachedPictures}>
            {(pictureData) => (
              <WallpaperItem
                src={pictureData.cached}
                onClicked={() => setWallpaper(pictureData.cached)}
              />
            )}
          </For>
        </box>
      </scrolledwindow>

      <box hexpand halign={Align.CENTER}>
        <button
          label="Clear wallpaper"
          class="wallpapers-clear"
          onClicked={() => setWallpaper()}
        />
      </box>
    </box>
  );
}
