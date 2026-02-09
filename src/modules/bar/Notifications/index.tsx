import { With } from "ags";
import { MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useNotification } from "@/hooks/useNotification";
import NotificationsActions from "./NotificationsActions";
import NotificationsHeader from "./NotificationsHeader";
import NotificationsList from "./NotificationsList";

export default function Notifications() {
  const { spacing, iconSize } = useGlobalConfig();
  const { iconName, notifications } = useNotification();

  const hasNotifications = notifications((n) => n.length > 0);
  const notificationCount = notifications((n) => n.length);

  return (
    <MenuButton>
      <box spacing={spacing("small")}>
        <image class="w-6" iconName={iconName} pixelSize={iconSize("small")} />
        <label
          class="w-2 rounded-full bg-primary px-1.75 py-1 font-bold text-on-primary text-xs"
          halign={Align.END}
          label={notificationCount(String)}
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
              <NotificationsHeader notificationCount={notificationCount} />
              <NotificationsActions hasNotifications={hasNotifications} />
            </box>

            <With value={hasNotifications}>
              {(hasNotifications) => (
                <NotificationsList
                  hasNotifications={hasNotifications}
                  notifications={notifications}
                />
              )}
            </With>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
