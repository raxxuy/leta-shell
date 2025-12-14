import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import LauncherModule from "@/modules/launcher";
import RevealerWindow from "@/widgets/RevealerWindow";

export default function Launcher(gdkmonitor: Gdk.Monitor) {
  return (
    <RevealerWindow
      name="launcher"
      class="launcher"
      application={app}
      anchor="bottom-full"
      namespace="leta-shell"
      layer={Layer.OVERLAY}
      keymode={Keymode.EXCLUSIVE}
      exclusivity={Exclusivity.IGNORE}
      transitionType={RevealerTransitionType.SLIDE_UP}
    >
      <LauncherModule gdkmonitor={gdkmonitor} />
    </RevealerWindow>
  );
}
