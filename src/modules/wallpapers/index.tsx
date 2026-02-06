import Graphene from "gi://Graphene";
import { For } from "ags";
import { type Gdk, Gtk } from "ags/gtk4";
import { Button } from "@/components/button";
import { Cursors } from "@/constants";
import { Align, Orientation, PolicyType } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useWallpaper } from "@/hooks/useWallpaper";
import { toggleWindow } from "@/utils";
import WallpaperItem from "./WallpaperItem";

interface WallpaperManagerProps {
  gdkmonitor: Gdk.Monitor;
}

export default function WallpaperManagerModule({
  gdkmonitor,
}: WallpaperManagerProps) {
  const { spacing } = useGlobalConfig();
  const { cachedPictures, setSource, setMonitorDimensions } = useWallpaper();
  const { width, height } = gdkmonitor.get_geometry();

  let box: Gtk.Box;
  const itemHeight = height / 4;
  const itemWidth = width / 4;
  const scrollHeight = height / 3.6;

  setMonitorDimensions(width, height);

  const init = (self: Gtk.Box) => {
    box = self;
  };

  const handlePress = (
    _e: Gtk.GestureClick,
    _: number,
    x: number,
    y: number,
  ) => {
    const [, rect] = box.compute_bounds(box.parent);
    const position = new Graphene.Point({ x, y });

    if (!rect.contains_point(position)) {
      toggleWindow("wallpapers");
      return true;
    }
  };

  const setWallpaper = (picture: string = "", full?: boolean) => {
    setSource(picture, full);
  };

  return (
    <>
      <Gtk.GestureClick onPressed={handlePress} />
      <box
        $={init}
        class="bg-background-dark/95 shadow-2xl"
        orientation={Orientation.VERTICAL}
        spacing={spacing("large")}
        valign={Align.CENTER}
      >
        <scrolledwindow
          hscrollbarPolicy={PolicyType.ALWAYS}
          minContentHeight={scrollHeight}
          minContentWidth={width}
          vscrollbarPolicy={PolicyType.NEVER}
        >
          <box class="py-10" spacing={spacing("larger")}>
            <For each={cachedPictures}>
              {(picture) => (
                <WallpaperItem
                  height={itemHeight}
                  onClicked={() => setWallpaper(picture.cached)}
                  onSecondaryClicked={() =>
                    setWallpaper(picture.original, true)
                  }
                  src={picture.cached}
                  width={itemWidth}
                />
              )}
            </For>
          </box>
        </scrolledwindow>

        <box class="p-10 pt-5" halign={Align.CENTER} spacing={spacing("large")}>
          <Button
            canFocus={false}
            class="border-2 border-background-lighter bg-background-light/60 px-4 py-2 font-bold text-base shadow-sm"
            cursor={Cursors.POINTER}
            label="Clear wallpaper"
            onClicked={() => setWallpaper()}
          />
        </box>
      </box>
    </>
  );
}
