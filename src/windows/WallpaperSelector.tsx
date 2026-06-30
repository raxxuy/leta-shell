import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Popup from "@/components/Popup";
import { Exclusivity, Keymode, Layer } from "@/enums";
import WallpaperSelectorModule from "@/modules/wallpaper-selector";
import WallpaperConfigProvider from "@/providers/WallpaperConfig";

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
    <Popup
      animation="popover"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="wallpaper-selector"
      namespace="leta-shell"
    >
      <WallpaperSelectorModule connector={connector} width={width * 0.9} />
    </Popup>
  );
};
