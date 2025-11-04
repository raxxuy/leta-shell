import { monitorFile } from "ags/file";
import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { exec } from "ags/process";
import { createState, For } from "gnim";
import { picturesDir } from "@/constants";
import { Align } from "@/enums";
import { setWallpaper } from "@/lib/cache";
import Window from "@/widgets/Window";

export default function WallpaperManager() {
  const [pictures, setPictures] = createState<string[]>([]);

  const fetchPictures = () => {
    const pictures = exec(`ls ${picturesDir}`)
      .split("\n")
      .map((picture) => `${picturesDir}/${picture}`);
    setPictures(pictures);
  };

  monitorFile(picturesDir, () => {
    fetchPictures();
  });

  fetchPictures();

  return (
    <Window
      anchor="CENTER"
      visible={false}
      name="wallpapers"
      class="wallpapers"
      application={app}
      onNotifyVisible={(self) => self.visible && self.get_focus()}
    >
      <Gtk.Grid
        vexpand
        hexpand
        halign={Align.CENTER}
        valign={Align.CENTER}
        rowHomogeneous
      >
        <For each={pictures}>
          {(picture) => (
            <button onClicked={() => setWallpaper(picture)}>
              <image file={picture} pixelSize={400} />
            </button>
          )}
        </For>
      </Gtk.Grid>
    </Window>
  );
}
