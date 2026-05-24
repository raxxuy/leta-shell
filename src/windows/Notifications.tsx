import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/ui/Window";
import { Exclusivity, Layer } from "@/enums";
import useNotificationsProps from "@/hooks/ui/windows/useNotificationsProps";
import NotificationsModule from "@/modules/notifications";

export default function NotificationsWindow(gdkmonitor: Gdk.Monitor) {
  const { hasNotifications } = useNotificationsProps();

  return (
    <Window
      anchor="bottom-right"
      application={app}
      exclusivity={Exclusivity.IGNORE}
      gdkmonitor={gdkmonitor}
      layer={Layer.OVERLAY}
      name="notifications"
      namespace="leta-shell"
      visible={hasNotifications}
    >
      <NotificationsModule />
    </Window>
  );
}
