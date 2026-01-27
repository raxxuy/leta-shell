import { createBinding, createState, For } from "ags";
import { MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Orientation } from "@/enums";
import ConfigService from "@/services/config";
import NotificationsService from "@/services/notification";
import Notification from "./Notification";

export default function Notifications() {
  const notificationService = NotificationsService.get_default();
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");
  const notifications = createBinding(notificationService, "notifications");

  const [iconName, setIconName] = createState<string>("notifications");

  const handleVisible = ({ visible }: { visible: boolean }) => {
    if (visible) setIconName("notifications");
  };

  notificationService.connect("notified", () => {
    setIconName("notifications-notified");
  });

  return (
    <MenuButton>
      <image iconName={iconName} pixelSize={icons((i) => i.pixelSize.small)} />
      <popover onNotifyVisible={handleVisible}>
        <Container>
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.large)}
            widthRequest={400}
          >
            <For each={notifications}>
              {(notification) => <Notification notification={notification} />}
            </For>
            <label
              label="No notifications"
              visible={notifications((n) => n.length === 0)}
            />
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
