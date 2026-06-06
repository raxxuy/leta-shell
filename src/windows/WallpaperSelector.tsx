import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import WallpaperSelectorModule from "@/modules/wallpaper-selector";
import WallpaperConfigProvider from "@/providers/WallpaperConfigProvider";

export default function WallpaperSelectorWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <WallpaperConfigProvider>
      {() => <WallpaperSelectorWindowInner gdkmonitor={gdkmonitor} />}
    </WallpaperConfigProvider>
  );
}

const WallpaperSelectorWindowInner = ({
  gdkmonitor,
}: {
  gdkmonitor: Gdk.Monitor;
}) => {
  const width = gdkmonitor.geometry.width;
  const connector = gdkmonitor.connector as string;

  return (
    <PopupWindow
      anchor="center"
      animation="scale"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="wallpaper-selector"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.NONE}
    >
      <WallpaperSelectorModule connector={connector} width={width} />
    </PopupWindow>
  );
};
