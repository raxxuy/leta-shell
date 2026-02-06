import type AstalNotifd from "gi://AstalNotifd";
import { createState, For, onCleanup } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { timeout } from "ags/time";
import Container from "@/components/Container";
import Window from "@/components/Window";
import { Layer, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { loadClasses } from "@/lib/styles";
import Notification from "@/modules/bar/Notifications/Notification";
import NotificationService from "@/services/notification";

export default function NotificationPopups(gdkmonitor: Gdk.Monitor) {
  const { spacing } = useGlobalConfig();
  const notificationService = NotificationService.get_default();
  const timers = new Map();

  const [list, setList] = createState<AstalNotifd.Notification[]>([]);
  const visible = list((l) => l.length > 0);

  const notifiedHandler = notificationService.connect(
    "notified",
    (_, id, replaced) => {
      const notification = notificationService.getNotification(id);

      if (replaced && list().some((n) => n.id === id)) {
        setList((list) => list.map((n) => (n.id === id ? notification : n)));
        timers.get(id)?.cancel();
      } else {
        setList((list) => [notification, ...list]);
      }

      const timer = timeout(5000, () => {
        setList((list) => list.filter((n) => n.id !== id));
        timers.delete(id);
      });

      timers.set(id, timer);
    },
  );

  const resolvedHandler = notificationService.connect("resolved", (_, id) => {
    setList((list) => list.filter((n) => n.id !== id));
  });

  onCleanup(() => {
    notificationService.disconnect(notifiedHandler);
    notificationService.disconnect(resolvedHandler);

    timers.forEach((timer) => {
      timer.cancel();
    });

    timers.clear();
  });

  return (
    <Window
      anchor="bottom-right"
      application={app}
      class="notification-popups"
      gdkmonitor={gdkmonitor}
      layer={Layer.OVERLAY}
      name="notification-popups"
      namespace="leta-shell"
      visible={visible}
    >
      <box orientation={Orientation.VERTICAL} spacing={spacing("medium")}>
        <For each={list}>
          {(notification) => (
            <Container $={loadClasses(Container)} hexpand widthRequest={400}>
              <Notification notification={notification} />
            </Container>
          )}
        </For>
      </box>
    </Window>
  );
}
