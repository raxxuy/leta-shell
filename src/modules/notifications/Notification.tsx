import type AstalNotifd from "gi://AstalNotifd";
import { createEffect } from "ags";
import { timeout } from "ags/time";
import { Align, EllipsizeMode, Orientation } from "@/enums";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import { formatLocalTime } from "@/lib/time";

interface NotificationProps {
  notification: AstalNotifd.Notification;
}

export default function Notification({ notification }: NotificationProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();

  createEffect(() => {
    timeout(5000, () => notification.dismiss());
  });

  return (
    <button
      $={scan}
      class="m-[5px_10px_15px] transform-cpu rounded-2xl border border-tertiary/20 bg-zinc-950/95 p-4 shadow-md transition-transform hover:scale-102 hover:border-tertiary/40 active:scale-98 active:border-tertiary/60 active:bg-zinc-850"
      hexpand={false}
      onClicked={() => notification.dismiss()}
    >
      <box orientation={Orientation.VERTICAL} widthRequest={400}>
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
            label={formatLocalTime(notification.time)?.toString()}
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
    </button>
  );
}
