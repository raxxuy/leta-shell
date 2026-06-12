import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Popup from "@/components/Popup";
import { Exclusivity, Keymode, Layer } from "@/enums";
import SettingsModule from "@/modules/settings";

export default function SettingsWindow(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.geometry;

  return (
    <Popup
      anchor="center"
      animation="popover"
      application={app}
      exclusivity={Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.ON_DEMAND}
      layer={Layer.OVERLAY}
      name="settings"
      namespace="leta-shell"
    >
      <SettingsModule height={height} width={width} />
    </Popup>
  );
}
