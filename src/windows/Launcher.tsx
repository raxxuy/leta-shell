import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Popup from "@/components/Popup";
import { Exclusivity, Keymode, Layer } from "@/enums";
import LauncherModule from "@/modules/launcher";
import LauncherProvider from "@/providers/Launcher";
import LauncherConfigProvider from "@/providers/LauncherConfig";

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <LauncherConfigProvider>
      {() => (
        <LauncherProvider>
          {() => <LauncherWindowInner gdkmonitor={gdkmonitor} />}
        </LauncherProvider>
      )}
    </LauncherConfigProvider>
  );
}

const LauncherWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const height = gdkmonitor.geometry.height;

  return (
    <Popup
      anchor="center"
      animation="popover"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      marginTop={height * 0.2}
      name="launcher"
      namespace="leta-shell"
      position="top"
    >
      <LauncherModule />
    </Popup>
  );
};
