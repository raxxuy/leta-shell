import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import useLauncherProps from "@/hooks/ui/windows/useLauncherProps";
import LauncherModule from "@/modules/launcher";

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  const { marginTop, width } = useLauncherProps(gdkmonitor);

  return (
    <PopupWindow
      anchor="center"
      animation="scale"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      marginTop={marginTop}
      name="launcher"
      namespace="leta-shell"
      position="top"
      // transitionDuration={100}
      transitionType={RevealerTransitionType.NONE}
    >
      <LauncherModule width={width} />
    </PopupWindow>
  );
}
