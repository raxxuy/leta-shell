import { For } from "ags";
import MenuButton from "@/components/MenuButton";
import Notification from "@/components/Notification";
import Popover from "@/components/Popover";
import { Align, Orientation } from "@/enums";
import { useNotifications } from "@/hooks/features/notifications/useNotifications";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import { cleanupWidget, scan } from "@/lib/theme";

export default function Notifications() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const {
    history,
    iconName,
    hasHistory,
    dndButtonClassName,
    clearHistory,
    toggleDnD,
  } = useNotifications();

  return (
    <MenuButton class="bar-menubutton" focusable={false}>
      <image iconName={iconName} pixelSize={pixelSize.sm} />
      <Popover animated class="bar-popover min-w-sm" hasArrow={false}>
        <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
          <box hexpand valign={Align.CENTER}>
            <label class="font-semibold opacity-90" label="Notifications" />
            <box halign={Align.END} hexpand spacing={spacing.sm}>
              <button
                class={dndButtonClassName}
                focusable={false}
                onClicked={toggleDnD}
              >
                <image iconName={iconName} pixelSize={pixelSize.sm} />
              </button>
              <button
                class="button-outline-custom py-0.5"
                focusable={false}
                onClicked={clearHistory}
                sensitive={hasHistory}
              >
                <image iconName="trash-03" pixelSize={pixelSize.sm} />
              </button>
            </box>
          </box>
          <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
            <box class="rounded-full border border-zinc-800" />
            <scrolledwindow maxContentHeight={240} propagateNaturalHeight>
              <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
                <For cleanup={cleanupWidget} each={history}>
                  {(notification) => (
                    <box $={scan}>
                      <Notification notification={notification} />
                    </box>
                  )}
                </For>
              </box>
            </scrolledwindow>
          </box>
        </box>
      </Popover>
    </MenuButton>
  );
}
