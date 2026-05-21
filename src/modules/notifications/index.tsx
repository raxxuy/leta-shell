import AstalNotifd from "gi://AstalNotifd";
import { For, onMount } from "ags";
import type { Astal } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation, WindowAnchor } from "@/enums";
import useNotifications from "@/hooks/services/useNotifications";
import { cleanupWidget } from "@/lib/theme";
import Notification from "./Notification";

export default function NotificationsModule() {
  const { notifications } = useNotifications();

  onMount(() => {
    const window = app.get_window("notifications") as Astal.Window;

    AstalNotifd.get_default().connect("resolved", () => {
      // Fixes an annoying issue with resizing
      window.set_anchor(WindowAnchor.NONE);
      window.set_anchor(WindowAnchor.RIGHT | WindowAnchor.BOTTOM);
    });
  });

  return (
    <box orientation={Orientation.VERTICAL} valign={Align.END}>
      <For cleanup={cleanupWidget} each={notifications}>
        {(notification) => <Notification notification={notification} />}
      </For>
    </box>
  );
}
