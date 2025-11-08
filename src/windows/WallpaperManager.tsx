import { createBinding, For } from "ags";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation } from "@/enums";
import Wallpaper from "@/services/wallpaper";
import Window from "@/widgets/Window";

export default function WallpaperManager() {
  const wallpaper = Wallpaper.get_default();
  const pictures = createBinding(wallpaper, "pictures");

  return (
    <Window
      visible={false}
      application={app}
      name="wallpapers"
      class="wallpapers"
      anchor="center-inline"
      onNotifyVisible={(self) => self.visible && self.get_focus()}
    >
      <box orientation={Orientation.VERTICAL}>
        <Gtk.Grid halign={Align.CENTER} valign={Align.CENTER} rowHomogeneous>
          <For each={pictures}>
            {(picture) => (
              <button
                onClicked={() => {
                  wallpaper.source = picture;
                }}
              >
                <image file={picture} pixelSize={400} />
              </button>
            )}
          </For>
        </Gtk.Grid>
        <button
          onClicked={() => {
            wallpaper.source = "";
          }}
        >
          Clear Wallpaper
        </button>
      </box>
    </Window>
  );
}
