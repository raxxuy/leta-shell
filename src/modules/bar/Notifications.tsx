import { createBinding, createState, For } from "ags";
import { Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import NotificationsService from "@/services/notifications";
import Container from "@/widgets/Container";

// import Notification from "@/widgets/Notification";

const { icons, spacings } = getConfig("bar");

export default function Notifications() {
  const [iconName, setIconName] = createState<string>("notifications-symbolic");
  const notifd = NotificationsService.get_default();
  const notifications = createBinding(notifd, "notifications");

  const handleVisible = ({ visible }: { visible: boolean }) => {
    if (visible) setIconName("notifications-symbolic");
  };

  notifd.connect("notified", () => {
    setIconName("notifications-notified-symbolic");
  });

  return (
    <menubutton class="notifications">
      <image iconName={iconName} pixelSize={icons.pixelSize.small} />
      <popover onNotifyVisible={handleVisible}>
        <Container>
          <box
            class="notifications-list"
            widthRequest={400}
            spacing={spacings.small}
            orientation={Orientation.VERTICAL}
          >
            {/*<For each={notifications}>
              {(notification) => <Notification notification={notification} />}
            </For>*/}
            <label
              visible={notifications((n) => n.length === 0)}
              label="No notifications"
            />
          </box>
        </Container>
      </popover>
    </menubutton>
  );
}
