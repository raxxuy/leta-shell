import type { Accessor } from "ags";
import clsx from "clsx";
import { Cursors } from "@/constants";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useNotification } from "@/hooks/useNotification";

interface NotificationsActionsProps {
  hasNotifications: Accessor<boolean>;
}

export default function NotificationsActions({
  hasNotifications,
}: NotificationsActionsProps) {
  const { spacing, iconSize } = useGlobalConfig();
  const { clearNotifications, setDontDisturb, dontDisturb } = useNotification();

  const handleClearAll = () => {
    clearNotifications();
  };

  const toggleDND = () => {
    setDontDisturb(!dontDisturb.peek());
  };
  return (
    <box class="p-2" spacing={spacing("small")}>
      <button
        class={clsx(
          "rounded-lg px-3 py-2 transition",
          "border border-outline/30 bg-surface",
          "hover:bg-surface-variant/50",
          "active:bg-surface-variant",
        )}
        cursor={Cursors.POINTER}
        onClicked={toggleDND}
      >
        <box spacing={spacing("small")}>
          <image
            iconName={dontDisturb((dnd) =>
              dnd ? "notifications-disabled" : "notifications",
            )}
            pixelSize={iconSize("small")}
          />
          <label
            class="font-medium text-sm"
            label={dontDisturb((dnd) => (dnd ? "DND On" : "DND Off"))}
          />
        </box>
      </button>

      <button
        class={clsx(
          "rounded-lg px-3 py-2 transition",
          "border border-outline/30 bg-surface",
          "hover:bg-surface-variant/50",
          "active:bg-surface-variant",
        )}
        cursor={Cursors.POINTER}
        onClicked={handleClearAll}
        sensitive={hasNotifications}
      >
        <box spacing={spacing("small")}>
          <image iconName="trash" pixelSize={iconSize("small")} />
          <label class="font-medium text-sm" label="Clear All" />
        </box>
      </button>
    </box>
  );
}
