import AstalNotifd from "gi://AstalNotifd";
import { For, onMount } from "ags";
import { timeout } from "ags/time";
import Notification from "@/components/Notification";
import { Align, Orientation, WindowAnchor } from "@/enums";
import { useNotifications } from "@/hooks/features/notifications/useNotifications";
import { cleanupWidget, scan } from "@/lib/theme";
import { getWindow } from "@/lib/window/utils";

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
        {(notification) => {
          onMount(() => timeout(5000, () => notification.dismiss()));

          return (
            <button
              $={scan}
              class="m-[5px_10px_15px] transform-cpu rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-4 shadow-md transition-transform hover:scale-102 hover:border-tertiary/40 active:scale-98 active:border-tertiary/60 active:bg-zinc-850"
              hexpand={false}
              onClicked={() => notification.dismiss()}
              widthRequest={400}
            >
              <Notification notification={notification} />
            </button>
          );
        }}
      </For>
    </box>
  );
}
