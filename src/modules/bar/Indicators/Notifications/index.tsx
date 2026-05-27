import { For } from "ags";
import MenuButton from "@/components/ui/MenuButton";
import Popover from "@/components/ui/Popover";
import { Align, EllipsizeMode, Orientation } from "@/enums";
import useNotifications from "@/hooks/services/useNotifications";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";
import { cleanupWidget } from "@/lib/theme";
import { formatLocalTime } from "@/lib/time";

export default function Notifications() {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const {
    history,
    hasHistory,
    iconName,
    dndClassName,
    toggleDnD,
    clearHistory,
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
                class={dndClassName}
                focusable={false}
                onClicked={toggleDnD}
              >
                <image iconName={iconName} pixelSize={pixelSize.sm} />
              </button>
              <button
                class="button-outline-custom"
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
                    <box orientation={Orientation.VERTICAL}>
                      {/* HEADER */}
                      <box spacing={spacing.sm}>
                        {notification.appIcon && (
                          <image
                            iconName={notification.appIcon}
                            pixelSize={pixelSize.sm}
                          />
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
