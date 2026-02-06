import { Button, MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { toggleWindow } from "@/utils";
import Media from "./Media";

export default function QuickSettings() {
  const { spacing, iconSize } = useGlobalConfig();

  const handleClick = () => toggleWindow("settings");

  return (
    <MenuButton>
      <image class="w-6" iconName="settings" pixelSize={iconSize("small")} />
      <popover>
        <Container class="p-0.5">
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacing("medium")}
            widthRequest={300}
          >
            <Media />
          </box>
          <box
            class="px-1 py-4"
            orientation={Orientation.VERTICAL}
            spacing={spacing("small")}
            valign={Align.CENTER}
          >
            <Button class="p-2" onClicked={handleClick} valign={Align.CENTER}>
              <image iconName="settings" pixelSize={iconSize("small")} />
            </Button>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
