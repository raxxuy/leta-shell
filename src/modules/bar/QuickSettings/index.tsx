import { Button, MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Align, Orientation } from "@/enums";
import { toggleWindow } from "@/lib/utils";
import ConfigService from "@/services/config";
import Media from "./Media";

export default function QuickSettings() {
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");

  const handleClick = () => toggleWindow("settings");

  return (
    <MenuButton>
      <image iconName="settings" pixelSize={icons((i) => i.pixelSize.small)} />
      <popover>
        <Container class="p-0.5">
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.medium)}
            widthRequest={300}
          >
            <Media />
          </box>
          <box
            class="px-1 py-4"
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.small)}
            valign={Align.CENTER}
          >
            <Button class="p-2" onClicked={handleClick} valign={Align.CENTER}>
              <image
                iconName="sliders-01"
                pixelSize={icons((i) => i.pixelSize.small)}
              />
            </Button>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
