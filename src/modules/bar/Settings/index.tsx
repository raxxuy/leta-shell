import { getConfig } from "@/lib/config";
import Container from "@/widgets/Container";
import Bluetooth from "./modules/Bluetooth";

const { icons } = getConfig("bar");

export default function Settings() {
  return (
    <menubutton class="settings">
      <image iconName="settings-symbolic" pixelSize={icons.pixelSize.small} />
      <popover>
        <Container>
          <Bluetooth />
        </Container>
      </popover>
    </menubutton>
  );
}
