import { createBinding, For } from "ags";
import { Align, Orientation, PolicyType } from "@/enums";
import { getConfig } from "@/lib/config";
import WallpaperItem from "@/modules/wallpapers/WallpaperItem";
import Wallpaper from "@/services/wallpaper";

const { spacing, list } = getConfig("wallpapers").main;

export default function WallpaperManagerModule() {
  const wallpaper = Wallpaper.get_default();

  const pictures = createBinding(wallpaper, "pictures");

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
          <For each={pictures}>
            {(picture) => (
              <WallpaperItem src={picture} onClicked={setWallpaper} />
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
