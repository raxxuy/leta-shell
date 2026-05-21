import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import useSettingsProps from "@/hooks/ui/windows/useSettingsProps";
import SettingsModule from "@/modules/settings";

export default function SettingsWindow(gdkmonitor: Gdk.Monitor) {
  const { width, height } = useSettingsProps(gdkmonitor);

  return (
    <PopupWindow
      anchor="center"
      animation="scale"
      application={app}
      exclusivity={Exclusivity.EXCLUSIVE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="settings"
      namespace="leta-shell"
      transitionType={RevealerTransitionType.NONE}
    >
      <SettingsModule height={height} width={width} />
    </PopupWindow>
  );
}
