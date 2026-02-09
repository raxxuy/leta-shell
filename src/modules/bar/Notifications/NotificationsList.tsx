import type AstalNotifd from "gi://AstalNotifd";
import { type Accessor, For } from "ags";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import Notification from "./Notification";

interface NotificationsListProps {
  notifications: Accessor<AstalNotifd.Notification[]>;
  hasNotifications: boolean;
}

export default function NotificationsList({
  notifications,
  hasNotifications,
}: NotificationsListProps) {
  const { spacing, iconSize } = useGlobalConfig();

  return hasNotifications ? (
    <scrolledwindow maxContentHeight={400} propagateNaturalHeight vexpand>
      <box
        class="p-2"
        hexpand
        orientation={Orientation.VERTICAL}
        spacing={spacing("medium")}
      >
        <For each={notifications}>
          {(notification) => (
            <box class="rounded-xl border border-outline/30 bg-background p-3">
              <Notification notification={notification} />
            </box>
          )}
        </For>
      </box>
    </scrolledwindow>
  ) : (
    <box
      class="p-3.75"
      halign={Align.CENTER}
      orientation={Orientation.VERTICAL}
      spacing={spacing("medium")}
    >
      <image
        class="opacity-30"
        iconName="notifications"
        pixelSize={iconSize("large")}
      />
      <label
        class="font-medium text-outline-variant"
        label="No notifications"
      />
    </box>
  );
}
