import type AstalNotifd from "gi://AstalNotifd";
import { Align, EllipsizeMode, Orientation } from "@/enums";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import { formatLocalTime } from "@/lib/time";
import type { PersistedNotification } from "@/services/notification/persisted";

interface NotificationProps {
  notification: AstalNotifd.Notification | PersistedNotification;
}

export default function Notification({ notification }: NotificationProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  return (
    <box orientation={Orientation.VERTICAL}>
      {/* HEADER */}
      <box spacing={spacing.sm}>
        {notification.appIcon && (
          <image iconName={notification.appIcon} pixelSize={pixelSize.sm} />
        )}
        <label
          class="font-semibold text-xs uppercase tracking-widest opacity-60"
          halign={Align.START}
          label={notification.appName}
        />
        <label
          class="text-xs opacity-60"
          halign={Align.END}
          hexpand
          label={String(formatLocalTime(notification.time))}
        />
      </box>

      {/* TITLE */}
      {notification.summary && (
        <label
          class="mt-1.5 font-semibold"
          ellipsize={EllipsizeMode.END}
          halign={Align.START}
          label={notification.summary}
        />
      )}

      {/* BODY */}
      {notification.body && (
        <label
          class="mt-0.5 opacity-80"
          ellipsize={EllipsizeMode.END}
          halign={Align.START}
          label={notification.body}
          maxWidthChars={40}
          xalign={0}
        />
      )}
    </box>
  );
}
