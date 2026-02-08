import Adw from "gi://Adw";
import type AstalNotifd from "gi://AstalNotifd";
import { startCase } from "es-toolkit";
import { Button } from "@/components/button";
import ImageWrapper from "@/components/ImageWrapper";
import {
  Align,
  EllipsizeMode,
  Justification,
  Orientation,
  Overflow,
} from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { loadClasses } from "@/lib/styles";
import { formatSeconds } from "@/utils";

type NotificationProps = {
  notification: AstalNotifd.Notification;
};

export default function Notification({ notification }: NotificationProps) {
  const { spacing, iconSize } = useGlobalConfig();
  const handleClick = () => notification.dismiss();

  return (
    <Adw.Clamp
      $={loadClasses(Notification)}
      hexpand
      maximumSize={400}
      vexpand={false}
    >
      <overlay>
        <box spacing={spacing("medium")}>
          <ImageWrapper
            class="rounded-lg shadow-md"
            file
            heightRequest={iconSize("larger")}
            overflow={Overflow.HIDDEN}
            src={notification.image}
            widthRequest={iconSize("larger")}
          />
          <box>
            <box orientation={Orientation.VERTICAL} vexpand>
              <label
                class="font-bold text-lg"
                ellipsize={EllipsizeMode.END}
                halign={Align.START}
                label={notification.summary}
                maxWidthChars={24}
              />
              {notification.body && (
                <label
                  class="font-semibold text-sm"
                  halign={Align.START}
                  justify={Justification.FILL}
                  label={notification.body}
                  useMarkup
                  wrap
                />
              )}

              <box valign={Align.END} vexpand>
                <label
                  class="font-medium text-on-surface-dark/80 text-sm"
                  halign={Align.START}
                  label={formatSeconds(notification.time, "%H:%M", true)}
                />
                <box halign={Align.END} hexpand>
                  <image
                    iconName={notification.appIcon}
                    pixelSize={iconSize("small")}
                  />
                  <label
                    class="font-medium text-on-surface-dark/80 text-sm"
                    label={startCase(notification.appName)}
                  />
                </box>
              </box>
            </box>
          </box>
        </box>

        <box $type="overlay">
          <Button
            halign={Align.END}
            hexpand
            onClicked={handleClick}
            valign={Align.START}
            vexpand
          >
            <image class="h-6 w-6" iconName="x" pixelSize={iconSize("small")} />
          </Button>
        </box>
      </overlay>
    </Adw.Clamp>
  );
}
