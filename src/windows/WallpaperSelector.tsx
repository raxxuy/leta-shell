import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow, {
  type PopupWindowProps,
} from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import useWallpaperProps from "@/hooks/ui/windows/useWallpaperProps";
import WallpaperSelectorModule from "@/modules/wallpaper-selector";

const WINDOW_PROPS = {
  anchor: "center",
  animation: "scale",
  application: app,
  exclusivity: Exclusivity.IGNORE,
  keymode: Keymode.EXCLUSIVE,
  layer: Layer.OVERLAY,
  name: "wallpaper-selector",
  namespace: "leta-shell",
  transitionType: RevealerTransitionType.NONE,
} satisfies PopupWindowProps;

export default function WallpaperSelectorWindow(gdkmonitor: Gdk.Monitor) {
  const { connector, width } = useWallpaperProps(gdkmonitor);

  return (
    <PopupWindow {...WINDOW_PROPS} gdkmonitor={gdkmonitor}>
      <WallpaperSelectorModule connector={connector} width={width} />
    </PopupWindow>
  );
}
