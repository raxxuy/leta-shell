import { createState } from "ags";
import { monitorFile } from "ags/file";
import type { Gdk } from "ags/gtk4";
import { cacheDir } from "@/constants";
import { Exclusivity, Layer } from "@/enums";
import { useCache } from "@/lib/cache";

export default function Background(gdkmonitor: Gdk.Monitor) {
  const { width } = gdkmonitor.geometry;

  const [wallpaper, setWallpaper] = createState<string>("");

  const fetchWallpaper = () => {
    setWallpaper(useCache("wallpaper") as string);
  };

  monitorFile(`${cacheDir}/wallpaper`, () => {
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
