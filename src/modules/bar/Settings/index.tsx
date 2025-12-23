import { getConfig } from "@/lib/config";
import Media from "@/modules/bar/Settings/modules/Media";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const { icons } = getConfig("global");

export default function Settings() {
  return (
    <MenuButton class="settings button">
      <image iconName="settings" pixelSize={icons.pixelSize.small} />
      <popover>
        <Container class="p-0.5">
          <Media />
        </Container>
      </popover>
    </MenuButton>
  );
}
