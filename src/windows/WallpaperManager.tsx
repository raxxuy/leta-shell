import { createBinding, For } from "ags";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation } from "@/enums";
import Wallpaper from "@/services/wallpaper";
import Window from "@/widgets/Window";

export default function WallpaperManager() {
  const wallpaper = Wallpaper.get_default();
  const pictures = createBinding(wallpaper, "pictures");

  const handlePictureClick = (picture: string = "") => {
    wallpaper.source = picture;
  };

  return (
    <Window
      visible={false}
      application={app}
      name="wallpapers"
      class="wallpapers"
      anchor="center-inline"
      onNotifyVisible={(self) => self.visible && self.get_focus()}
    >
      <box
        spacing={40}
        class="wallpapers-main"
        orientation={Orientation.VERTICAL}
      >
        <scrolledwindow
          class="wallpapers-scrolledwindow"
          minContentWidth={1920}
          minContentHeight={500}
          vscrollbarPolicy={Gtk.PolicyType.NEVER}
          hscrollbarPolicy={Gtk.PolicyType.ALWAYS}
        >
          <box spacing={40}>
            <For each={pictures}>
              {(picture) => (
                <button
                  heightRequest={533}
                  widthRequest={300}
                  css={`
                    background-image: url(file://${picture});
                    background-size: cover;
                    background-position: center;
                  `}
                  overflow={Gtk.Overflow.HIDDEN}
                  onClicked={() => handlePictureClick(picture)}
                />
              )}
            </For>
          </box>
        </scrolledwindow>
        <box hexpand halign={Align.CENTER}>
          <button
            label="Clear wallpaper"
            class="wallpapers-clear"
            onClicked={() => handlePictureClick()}
          />
        </box>
      </box>
    </Window>
  );
}
