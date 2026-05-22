import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import PopupWindow, {
  type PopupWindowProps,
} from "@/components/ui/PopupWindow";
import { Exclusivity, Keymode, Layer, RevealerTransitionType } from "@/enums";
import useLauncherProps from "@/hooks/ui/windows/useLauncherProps";
import LauncherModule from "@/modules/launcher";

const WINDOW_PROPS = {
  anchor: "center",
  animation: "scale",
  application: app,
  exclusivity: Exclusivity.IGNORE,
  keymode: Keymode.EXCLUSIVE,
  layer: Layer.OVERLAY,
  name: "launcher",
  namespace: "leta-shell",
  position: "top",
  transitionType: RevealerTransitionType.NONE,
} satisfies PopupWindowProps;

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  const { marginTop, width } = useLauncherProps(gdkmonitor);

  return (
    <PopupWindow
      {...WINDOW_PROPS}
      gdkmonitor={gdkmonitor}
      marginTop={marginTop}
    >
      <LauncherModule width={width} />
    </PopupWindow>
  );
}
