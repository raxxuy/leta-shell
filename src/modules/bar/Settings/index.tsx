import { getConfig } from "@/lib/config";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const { icons } = getConfig("bar");

export default function Settings() {
  return (
    <MenuButton class="settings menu-button">
      <image iconName="settings" pixelSize={icons.pixelSize.small} />
      <popover>
        <Container class="settings-container"></Container>
      </popover>
    </MenuButton>
  );
}
