import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";

export default function SettingsWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <PopupWindow
      anchor="center"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="settings"
      namespace="leta-shell"
      position="top"
      transitionDuration={100}
      transitionType={RevealerTransitionType.CROSSFADE}
    ></PopupWindow>
  );
}
