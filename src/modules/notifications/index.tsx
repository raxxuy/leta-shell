import AstalNotifd from "gi://AstalNotifd";
import { For, onMount } from "ags";
import { Align, Orientation, WindowAnchor } from "@/enums";
import { useNotifications } from "@/hooks/features/notifications/useNotifications";
import { cleanupWidget } from "@/lib/theme";
import { getWindow } from "@/lib/window/utils";
import Notification from "./Notification";

export default function NotificationsModule() {
  const { notifications } = useNotifications();

  onMount(() => {
    const window = getWindow("notifications");

    AstalNotifd.get_default().connect("resolved", () => {
      // Fixes an annoying issue with resizing
      window?.set_anchor(WindowAnchor.NONE);
      window?.set_anchor(WindowAnchor.RIGHT | WindowAnchor.BOTTOM);
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
