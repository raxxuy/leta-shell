import { createState, With } from "ags";
import { monitorFile, readFile } from "ags/file";
import type { Gdk } from "ags/gtk4";
import { walFile } from "@/constants";
import { Align, Exclusivity, Layer } from "@/enums";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width } = gdkmonitor.geometry;

  const [wallpaper, setWallpaper] = createState<string>("");

  const fetchWallpaper = () => {
    setWallpaper(readFile(walFile));
  };

  monitorFile(walFile, () => {
    fetchWallpaper();
  });

  fetchWallpaper();

  return (
    <window
      visible
      name="background"
      class="background"
      layer={Layer.BACKGROUND}
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.IGNORE}
    >
      <With value={wallpaper}>
        {(wallpaper) =>
          wallpaper !== "" ? (
            <image pixelSize={width} file={wallpaper} />
          ) : (
            <box class="background-no-wallpaper" halign={Align.CENTER}>
              No wallpaper selected
            </box>
          )
        }
      </With>
    </window>
  );
}
