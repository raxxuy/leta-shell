import Adw from "gi://Adw";
import type AstalNotifd from "gi://AstalNotifd";
import {
  Align,
  EllipsizeMode,
  Justification,
  Orientation,
  Overflow,
} from "@/enums";
import { getConfig } from "@/lib/config";
import { loadClasses } from "@/lib/styles";
import { formatSeconds } from "@/lib/utils";
import ImageWrapper from "@/widgets/ImageWrapper";

type NotificationProps = {
  notification: AstalNotifd.Notification;
};

const { icons, spacings } = getConfig("global");

export default function Notification({ notification }: NotificationProps) {
  return (
    <Adw.Clamp
      $={loadClasses(Notification)}
      hexpand
      maximumSize={400}
      vexpand={false}
    >
      <overlay widthRequest={400}>
        <box spacing={spacings.medium}>
          <ImageWrapper
            class="rounded-lg shadow"
            file
            heightRequest={icons.pixelSize.larger}
            overflow={Overflow.HIDDEN}
            src={notification.image}
            widthRequest={icons.pixelSize.larger}
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
                    pixelSize={icons.pixelSize.small}
                  />
                  <label
                    class="font-medium text-foreground-dark/80 text-sm"
                    label={notification.appName}
                  />
                </box>
              </box>
            </box>
          </box>
        </box>

        <box $type="overlay">
          <button
            class="button"
            halign={Align.END}
            hexpand
            onClicked={() => notification.dismiss()}
            valign={Align.START}
            vexpand
          >
            <image
              class="h-6 w-6"
              iconName="x"
              pixelSize={icons.pixelSize.small}
            />
          </button>
        </box>
      </overlay>
    </Adw.Clamp>
  );
}
