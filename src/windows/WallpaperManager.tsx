import app from "ags/gtk4/app";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import WallpaperManagerModule from "@/modules/wallpapers";
import RevealerWindow from "@/widgets/RevealerWindow";

export default function WallpaperManager() {
  return (
    <RevealerWindow
      application={app}
      name="wallpapers"
      class="wallpapers"
      anchor="center-inline"
      namespace="leta-shell"
      layer={Layer.OVERLAY}
      keymode={Keymode.EXCLUSIVE}
      exclusivity={Exclusivity.IGNORE}
      transitionType={RevealerTransitionType.SWING_UP}
    >
      <WallpaperManagerModule />
    </RevealerWindow>
  );
}
