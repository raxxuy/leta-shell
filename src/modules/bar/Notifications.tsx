import { createBinding, createState, For } from "ags";
import { Orientation } from "@/enums";
import ConfigManager from "@/services/configs";
import NotificationsService from "@/services/notifications";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";
import Notification from "@/widgets/Notification";

export default function Notifications() {
  const notifd = NotificationsService.get_default();
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const notifications = createBinding(notifd, "notifications");

  const [iconName, setIconName] = createState<string>("notifications");

  const handleVisible = ({ visible }: { visible: boolean }) => {
    if (visible) setIconName("notifications");
  };

  notifd.connect("notified", () => {
    setIconName("notifications-notified");
  });

  return (
    <MenuButton class="button">
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
