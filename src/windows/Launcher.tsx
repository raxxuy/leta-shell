import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import LauncherModule from "@/modules/launcher";
import LauncherConfigProvider from "@/providers/LauncherConfigProvider";

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <LauncherConfigProvider>
      {() => <LauncherWindowInner gdkmonitor={gdkmonitor} />}
    </LauncherConfigProvider>
  );
}

const LauncherWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const { width, height } = gdkmonitor.geometry;

  return (
    <PopupWindow
      anchor="center"
      animation="scale"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      marginTop={height * 0.2}
      name="launcher"
      namespace="leta-shell"
      position="top"
      transitionType={RevealerTransitionType.NONE}
    >
      <LauncherModule width={width} />
    </PopupWindow>
  );
};
