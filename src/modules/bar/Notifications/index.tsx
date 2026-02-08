import { For, With } from "ags";
import clsx from "clsx/lite";
import { MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Cursors } from "@/constants";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useNotification } from "@/hooks/useNotification";
import Notification from "./Notification";

export default function Notifications() {
  const { spacing, iconSize } = useGlobalConfig();
  const {
    iconName,
    dontDisturb,
    notifications,
    setDontDisturb,
    clearNotifications,
  } = useNotification();

  const hasNotifications = notifications((n) => n.length > 0);
  const notificationCount = notifications((n) => n.length)(String);

  const handleClearAll = () => {
    clearNotifications();
  };

  const toggleDND = () => {
    setDontDisturb(!dontDisturb.peek());
  };

  return (
    <MenuButton>
      <box spacing={spacing("small")}>
        <image class="w-6" iconName={iconName} pixelSize={iconSize("small")} />
        <label
          class="w-2 rounded-full bg-primary px-1.75 py-1 font-bold text-on-primary text-xs"
          label={notificationCount}
          valign={Align.CENTER}
        />
      </box>

      <popover>
        <Container>
          <box
            class="w-110"
            orientation={Orientation.VERTICAL}
            spacing={spacing("medium")}
          >
            <box orientation={Orientation.VERTICAL}>
              {/* Header */}
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
                    label={notificationCount((nc) => `${nc} new`)}
                  />
                </box>
              </box>

              {/* Actions */}
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
            </box>

            {/* Notifications List */}
            <With value={hasNotifications}>
              {(hasNotifications) =>
                hasNotifications ? (
                  <scrolledwindow
                    class="h-56.5"
                    maxContentHeight={400}
                    propagateNaturalHeight
                    vexpand
                  >
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
                    class="py-16"
                    halign={Align.CENTER}
                    orientation={Orientation.VERTICAL}
                    spacing={spacing("medium")}
                  >
                    <image
                      class="opacity-30"
                      iconName="notifications"
                      pixelSize={iconSize("larger")}
                    />
                    <label
                      class="font-medium text-outline-variant"
                      label="No notifications"
                    />
                  </box>
                )
              }
            </With>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
