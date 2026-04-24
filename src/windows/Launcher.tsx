import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import LauncherModule from "@/modules/launcher";

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  const { height } = gdkmonitor.geometry;

  return (
    <PopupWindow
      anchor="center"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      marginTop={height * 0.2}
      name="launcher"
      namespace="leta-shell"
      position="top"
      transitionDuration={100}
      transitionType={RevealerTransitionType.CROSSFADE}
    >
      <LauncherModule gdkmonitor={gdkmonitor} />
    </PopupWindow>
  );
}
