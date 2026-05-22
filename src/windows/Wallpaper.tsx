import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window, { type WindowProps } from "@/components/ui/Window";
import { Exclusivity, Layer } from "@/enums";
import useWallpaperProps from "@/hooks/ui/windows/useWallpaperProps";
import WallpaperModule from "@/modules/wallpaper";

const WINDOW_PROPS = {
  application: app,
  exclusivity: Exclusivity.IGNORE,
  layer: Layer.BACKGROUND,
  name: "wallpaper",
  namespace: "leta-shell",
} satisfies WindowProps;

export function WallpaperWindow(gdkmonitor: Gdk.Monitor) {
  const { enabled, connector, width, height } = useWallpaperProps(gdkmonitor);

  return (
    <Window {...WINDOW_PROPS} gdkmonitor={gdkmonitor} visible={enabled}>
      <WallpaperModule connector={connector} height={height} width={width} />
    </Window>
  );
}

export default WallpaperWindow;
