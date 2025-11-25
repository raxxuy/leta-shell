import { createBinding, For } from "ags";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation } from "@/enums";
import { configs } from "@/lib/config";
import Wallpaper from "@/services/wallpaper";
import Window from "@/widgets/Window";

const {
  spacing,
  list: {
    spacing: listSpacing,
    width: listWidth,
    height: listHeight,
    picture: { width: pictureWidth, height: pictureHeight },
  },
} = configs.wallpapers.main;

export default function WallpaperManager() {
  const wallpaper = Wallpaper.get_default();
  const pictures = createBinding(wallpaper, "pictures");

  const setWallpaper = (picture?: string) => {
    wallpaper.source = picture ?? "";
  };

  const handleVisible = (self: Gtk.Window) => {
    if (self.visible) self.get_focus();
  };

  return (
    <Window
      visible={false}
      application={app}
      name="wallpapers"
      class="wallpapers"
      anchor="center-inline"
      onNotifyVisible={handleVisible}
    >
      <box
        spacing={spacing}
        class="wallpapers-main"
        orientation={Orientation.VERTICAL}
      >
        <scrolledwindow
          class="wallpapers-scrolledwindow"
          minContentWidth={listWidth}
          minContentHeight={listHeight}
          vscrollbarPolicy={Gtk.PolicyType.NEVER}
          hscrollbarPolicy={Gtk.PolicyType.ALWAYS}
        >
          <box spacing={listSpacing}>
            <For each={pictures}>
              {(picture) => (
                <button
                  heightRequest={pictureHeight}
                  widthRequest={pictureWidth}
                  css={`
                    background-image: url(file://${picture});
                    background-size: cover;
                    background-position: center;
                  `}
                  overflow={Gtk.Overflow.HIDDEN}
                  onClicked={() => setWallpaper(picture)}
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
    </Window>
  );
}
