import AstalNotifd from "gi://AstalNotifd";
import { onMount } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import Window from "@/components/ui/Window";
import { Exclusivity, Layer, WindowAnchor } from "@/enums";
import { useNotifications } from "@/hooks/features/notifications/useNotifications";
import NotificationsModule from "@/modules/notifications";

export default function NotificationsWindow(gdkmonitor: Gdk.Monitor) {
  const { hasNotifications } = useNotifications();

  return (
    <Window
      $={(self) =>
        onMount(() => {
          const id = AstalNotifd.get_default().connect("resolved", () => {
            self.set_anchor(WindowAnchor.NONE);
            self.set_anchor(WindowAnchor.RIGHT | WindowAnchor.BOTTOM);
          });
          return () => AstalNotifd.get_default().disconnect(id);
        })
      }
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
