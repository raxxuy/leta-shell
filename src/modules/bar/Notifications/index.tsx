import { createBinding, createState, For } from "ags";
import MenuButton from "@/components/button/MenuButton";
import Container from "@/components/Container";
import { Orientation } from "@/enums";
import Notification from "@/modules/bar/Notifications/Notification";
import ConfigManager from "@/services/configs";
import NotificationsService from "@/services/notifications";

export default function Notifications() {
  const notifd = NotificationsService.get_default();
  const icons = ConfigManager.bind("global", "icons");
  const spacings = ConfigManager.bind("global", "spacings");
  const notifications = createBinding(notifd, "notifications");

  const [iconName, setIconName] = createState<string>("notifications");

  const handleVisible = ({ visible }: { visible: boolean }) => {
    if (visible) setIconName("notifications");
  };

  notifd.connect("notified", () => {
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
