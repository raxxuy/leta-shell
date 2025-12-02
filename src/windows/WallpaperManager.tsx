import { createBinding, For } from "ags";
import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation, Overflow, PolicyType } from "@/enums";
import { configs } from "@/lib/config";
import Wallpaper from "@/services/wallpaper";
import ImageWrapper from "@/widgets/ImageWrapper";
import Window from "@/widgets/Window";

const { spacing, list } = configs.wallpapers.main;

const WallpaperItem = ({
  picture,
  onSelect,
}: {
  picture: string;
  onSelect: (picture: string) => void;
}) => (
  <ImageWrapper
    file
    src={picture}
    type="button"
    overflow={Overflow.HIDDEN}
    widthRequest={list.picture.width}
    heightRequest={list.picture.height}
    onClicked={() => onSelect(picture)}
  />
);

export default function WallpaperManager() {
  const wallpaper = Wallpaper.get_default();
  const pictures = createBinding(wallpaper, "pictures");

  const setWallpaper = (picture?: string) => {
    wallpaper.source = picture ?? "";
  };

  const handleVisible = (self: Gtk.Window) => self.visible && self.get_focus();

  return (
    <Window
      visible={false}
      application={app}
      name="wallpapers"
      class="wallpapers"
      anchor="center-inline"
      namespace="leta-shell"
      onNotifyVisible={handleVisible}
    >
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
                <WallpaperItem picture={picture} onSelect={setWallpaper} />
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
    </Window>
  );
}
