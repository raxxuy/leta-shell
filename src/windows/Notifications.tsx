import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window, { type WindowProps } from "@/components/ui/Window";
import { Exclusivity, Layer } from "@/enums";
import useNotificationsProps from "@/hooks/ui/windows/useNotificationsProps";
import NotificationsModule from "@/modules/notifications";

const WINDOW_PROPS = {
  anchor: "bottom-right",
  application: app,
  exclusivity: Exclusivity.IGNORE,
  layer: Layer.OVERLAY,
  name: "notifications",
  namespace: "leta-shell",
} satisfies WindowProps;

export default function NotificationsWindow(gdkmonitor: Gdk.Monitor) {
  const { hasNotifications } = useNotificationsProps();

  return (
    <Window
      {...WINDOW_PROPS}
      gdkmonitor={gdkmonitor}
      visible={hasNotifications}
    >
      <NotificationsModule />
    </Window>
  );
}
