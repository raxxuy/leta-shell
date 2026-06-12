import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/Window";
import { Exclusivity, Keymode, Layer } from "@/enums";
import LockScreenModule from "@/modules/lock-screen";

export default function LockScreenWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <Window
      anchor="center"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      keymode={Keymode.EXCLUSIVE}
      layer={Layer.OVERLAY}
      name="lock-screen"
      namespace="leta-shell"
      visible={false}
    >
      <LockScreenModule />
    </Window>
  );
}
