import { monitorFile } from "ags/file";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { exec } from "ags/process";
import { createState, For } from "gnim";
import { PICTURES_DIR } from "@/constants";
import { Align, Orientation } from "@/enums";
import { setWallpaper } from "@/lib/cache";
import Window from "@/widgets/Window";

export default function WallpaperManager() {
  const [pictures, setPictures] = createState<string[]>([]);

  const fetchPictures = () => {
    const pictures = exec(`ls ${PICTURES_DIR}`)
      .split("\n")
      .map((picture) => `${PICTURES_DIR}/${picture}`);
    setPictures(pictures);
  };

  monitorFile(PICTURES_DIR, () => {
    fetchPictures();
  });

  fetchPictures();

  return (
    <Window
      anchor="CENTER_INLINE"
      visible={false}
      name="wallpapers"
      class="wallpapers"
      application={app}
      onNotifyVisible={(self) => self.visible && self.get_focus()}
    >
      <box orientation={Orientation.VERTICAL}>
        <Gtk.Grid halign={Align.CENTER} valign={Align.CENTER} rowHomogeneous>
          <For each={pictures}>
            {(picture) => (
              <button onClicked={() => setWallpaper(picture)}>
                <image file={picture} pixelSize={400} />
              </button>
            )}
          </For>
        </Gtk.Grid>
        <button onClicked={() => setWallpaper("")}>Clear Wallpaper</button>
      </box>
    </Window>
  );
}
