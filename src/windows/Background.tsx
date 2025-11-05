import { createState } from "ags";
import { monitorFile, readFile } from "ags/file";
import type { Gdk } from "ags/gtk4";
import { cacheDir } from "@/constants";
import { Exclusivity, Layer } from "@/enums";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width } = gdkmonitor.geometry;

  const [wallpaper, setWallpaper] = createState<string>("");

  const fetchWallpaper = () => {
    setWallpaper(readFile(`${cacheDir}/wal/wal`));
  };

  monitorFile(`${cacheDir}/wal/wal`, () => {
    fetchWallpaper();
  });

  fetchWallpaper();

  return (
    <window
      visible
      layer={Layer.BACKGROUND}
      gdkmonitor={gdkmonitor}
      exclusivity={Exclusivity.IGNORE}
    >
      <image pixelSize={width} file={wallpaper} />
    </window>
  );
}
