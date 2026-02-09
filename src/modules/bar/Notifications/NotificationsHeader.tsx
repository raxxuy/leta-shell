import type { Accessor } from "ags";
import { Align } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";

interface NotificationsHeaderProps {
  notificationCount: Accessor<number>;
}
export default function NotificationsHeader({
  notificationCount,
}: NotificationsHeaderProps) {
  const { spacing } = useGlobalConfig();

  return (
    <box class="border-outline/20 p-2">
      <box hexpand spacing={spacing("medium")}>
        <label
          class="font-bold text-lg"
          halign={Align.START}
          hexpand
          label="Notifications"
        />
        <label
          class="font-medium text-outline-variant text-sm"
          label={notificationCount((nc) => `${String(nc)} new`)}
        />
      </box>
    </box>
  );
}
