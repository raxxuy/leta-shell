import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import WallpaperManagerModule from "@/modules/wallpapers";
import RevealerWindow from "@/widgets/RevealerWindow";

export default function WallpaperManager(gdkmonitor: Gdk.Monitor) {
  return (
    <RevealerWindow
      anchor="center-inline"
      application={app}
      class="wallpapers"
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
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
