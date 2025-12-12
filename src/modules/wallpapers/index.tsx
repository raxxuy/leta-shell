import { createBinding, createState, For } from "ags";
import type { Gdk } from "ags/gtk4";
import { CURSORS } from "@/constants";
import { Align, Orientation, PolicyType } from "@/enums";
import { getConfig } from "@/lib/config";
import Wallpaper from "@/services/wallpaper";
import WallpaperItem from "./WallpaperItem";

const { spacings } = getConfig("global");

interface WallpaperManagerProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperManagerModule({
  gdkmonitor,
}: WallpaperManagerProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const [wallpaperWidth, setWidth] = createState<number>(width);
  const [wallpaperHeight, setHeight] = createState<number>(height);
  const wallpaper = Wallpaper.get_default();
  const cachedPictures = createBinding(wallpaper, "cachedPictures");

  wallpaper.setMonitorDimensions(width, height);

  const setWallpaper = (picture?: string) => {
    wallpaper.source = picture ?? "";
  };

  const saveSettings = () => {
    wallpaper.setMonitorDimensions(wallpaperWidth(), wallpaperHeight());
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

      <box class="p-10" halign={Align.CENTER} spacing={spacings.large}>
        {/*<box spacing={spacings.medium}>
          <label class="text-base font-bold" label="Width" />
          <entry
            class="border-1 px-2 rounded-md"
            placeholderText={wallpaperWidth(String)}
            onNotifyText={({ text }) => setWidth(Number(text))}
          />
        </box>
        <box spacing={spacings.medium}>
          <label class="text-base font-bold" label="Height" />
          <entry
            class="border-1 px-2 rounded-md"
            placeholderText={wallpaperHeight(String)}
            onNotifyText={({ text }) => setHeight(Number(text))}
          />
        </box>*/}
        {/*<button
          label="Save settings"
          class="button text-base bg-background border-2 font-bold px-4 py-2"
          cursor={CURSORS.pointer}
          onClicked={saveSettings}
        />*/}
        <button
          label="Clear wallpaper"
          class="button text-base bg-background border-2 font-bold px-4 py-2"
          cursor={CURSORS.pointer}
          onClicked={() => setWallpaper()}
        />
      </box>
    </box>
  );
}
