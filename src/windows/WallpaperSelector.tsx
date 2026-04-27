import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import useWallpaperProps from "@/hooks/ui/windows/useWallpaperProps";
import WallpaperSelectorModule from "@/modules/wallpaper-selector";

export default function WallpaperSelectorWindow(gdkmonitor: Gdk.Monitor) {
  const { connector, width } = useWallpaperProps(gdkmonitor);

  return (
    <PopupWindow
      anchor="center"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="wallpaper-selector"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.SWING_UP}
    >
      <WallpaperSelectorModule connector={connector} width={width} />
    </PopupWindow>
  );
}
