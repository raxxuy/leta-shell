import type AstalNotifd from "gi://AstalNotifd";
import { createState, For, onCleanup } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { timeout } from "ags/time";
import { Layer, Orientation } from "@/enums";
import { loadClasses } from "@/lib/styles";
import ConfigManager from "@/services/configs";
import Notifications from "@/services/notifications";
import Container from "@/widgets/Container";
import Notification from "@/widgets/Notification";
import Window from "@/widgets/Window";

export default function NotificationPopups(gdkmonitor: Gdk.Monitor) {
  const notifd = Notifications.get_default();
  const configManager = ConfigManager.get_default();
  const spacings = configManager.bind("global", "spacings");

  const [list, setList] = createState<AstalNotifd.Notification[]>([]);
  const visible = list((l) => l.length > 0);
  const timers = new Map();

  const notifiedHandler = notifd.connect("notified", (_, id, replaced) => {
    const notification = notifd.getNotification(id);

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
  });

  const resolvedHandler = notifd.connect("resolved", (_, id) => {
    setList((list) => list.filter((n) => n.id !== id));
  });

  onCleanup(() => {
    notifd.disconnect(notifiedHandler);
    notifd.disconnect(resolvedHandler);

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
      <box
        orientation={Orientation.VERTICAL}
        spacing={spacings((s) => s.medium)}
      >
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
