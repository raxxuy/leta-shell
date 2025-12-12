import { getConfig } from "@/lib/config";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const { icons } = getConfig("global");

export default function Settings() {
  return (
    <MenuButton class="settings button">
      <image iconName="settings" pixelSize={icons.pixelSize.small} />
      <popover>
        <Container></Container>
      </popover>
    </MenuButton>
  );
}
