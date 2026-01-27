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
import { loadClasses } from "@/lib/styles";
import { formatSeconds } from "@/lib/utils";
import ConfigService from "@/services/config";

type NotificationProps = {
  notification: AstalNotifd.Notification;
};

export default function Notification({ notification }: NotificationProps) {
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");

  const handleClick = () => notification.dismiss();

  return (
    <Adw.Clamp
      $={loadClasses(Notification)}
      hexpand
      maximumSize={400}
      vexpand={false}
    >
      <overlay widthRequest={400}>
        <box spacing={spacings((s) => s.medium)}>
          <ImageWrapper
            class="rounded-lg shadow-md"
            file
            heightRequest={icons((i) => i.pixelSize.larger)}
            overflow={Overflow.HIDDEN}
            src={notification.image}
            widthRequest={icons((i) => i.pixelSize.larger)}
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
                  class="font-medium text-foreground-dark/80 text-sm"
                  halign={Align.START}
                  label={formatSeconds(notification.time, "%H:%M", true)}
                />
                <box halign={Align.END} hexpand>
                  <image
                    iconName={notification.appIcon}
                    pixelSize={icons((i) => i.pixelSize.small)}
                  />
                  <label
                    class="font-medium text-foreground-dark/80 text-sm"
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
            <image
              class="h-6 w-6"
              iconName="x"
              pixelSize={icons((i) => i.pixelSize.small)}
            />
          </Button>
        </box>
      </overlay>
    </Adw.Clamp>
  );
}
