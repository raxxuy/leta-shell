import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import RevealerWindow from "@/components/RevealerWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import WallpaperManagerModule from "@/modules/wallpapers";

export default function WallpaperManager(gdkmonitor: Gdk.Monitor) {
  const { height } = gdkmonitor.get_geometry();

  return (
    <RevealerWindow
      anchor="center-inline"
      application={app}
      class="wallpapers"
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      heightRequest={height}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="wallpapers"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.SWING_UP}
    >
      <WallpaperManagerModule gdkmonitor={gdkmonitor} />
    </RevealerWindow>
  );
}
