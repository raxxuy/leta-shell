import type { WindowProps } from "@/components/types";
import { ContentFit } from "@/enums";
import { createWallpaper } from "./createWallpaper";

export default function WallpaperWindow({
  application,
  monitor,
  visible,
}: WindowProps) {
  const wallpaper = createWallpaper(monitor);

  return (
    <layerwindow
      anchor={["top", "bottom", "left", "right"]}
      application={application}
      class="bg-zinc-800"
      exclusivity="ignore"
      layer="background"
      monitor={monitor}
      name="wallpaper"
      namespace="leta-shell"
      visible={visible}
    >
      <picture contentFit={ContentFit.COVER} file={wallpaper} />
    </layerwindow>
  );
}
