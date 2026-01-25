import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import RevealerWindow from "@/components/RevealerWindow";
import {
  Align,
  Exclusivity,
  Keymode,
  Layer,
  RevealerTransitionType,
} from "@/enums";
import LauncherModule from "@/modules/launcher";

export default function Launcher(gdkmonitor: Gdk.Monitor) {
  const { height } = gdkmonitor.get_geometry();

  return (
    <RevealerWindow
      anchor="center"
      application={app}
      class="launcher"
      exclusivity={Exclusivity.IGNORE}
      heightRequest={height}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="launcher"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.SWING_UP}
      valign={Align.START}
    >
      <LauncherModule gdkmonitor={gdkmonitor} />
    </RevealerWindow>
  );
}
