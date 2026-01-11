import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import LauncherModule from "@/modules/launcher";
import RevealerWindow from "@/widgets/RevealerWindow";

export default function Launcher(gdkmonitor: Gdk.Monitor) {
  return (
    <RevealerWindow
      anchor="bottom-full"
      application={app}
      class="launcher"
      exclusivity={Exclusivity.IGNORE}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="launcher"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
      <LauncherModule gdkmonitor={gdkmonitor} />
    </RevealerWindow>
  );
}
