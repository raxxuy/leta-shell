import { For } from "ags";
import { MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useNotification } from "@/hooks/useNotification";
import Notification from "./Notification";

export default function Notifications() {
  const { spacing, iconSize } = useGlobalConfig();
  const { iconName, notifications, checkNotifications } = useNotification();

  const handleNotifyVisible = () => {
    checkNotifications();
  };

  return (
    <MenuButton>
      <image class="w-6" iconName={iconName} pixelSize={iconSize("small")} />
      <popover onNotifyVisible={handleNotifyVisible}>
        <Container>
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacing("large")}
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
