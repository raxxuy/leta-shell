import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import SettingsModule from "@/modules/settings";

export default function SettingsWindow(gdkmonitor: Gdk.Monitor) {
  const { width, height } = gdkmonitor.geometry;

  return (
    <PopupWindow
      anchor="center"
      animation="scale"
      application={app}
      exclusivity={Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.ON_DEMAND}
      layer={Layer.OVERLAY}
      name="settings"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.NONE}
    >
      <SettingsModule height={height} width={width} />
    </PopupWindow>
  );
}
