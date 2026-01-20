import { Align, Orientation } from "@/enums";
import { toggleWindow } from "@/lib/utils";
import Media from "@/modules/bar/QuickSettings/Media";
import ConfigManager from "@/services/configs";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

export default function QuickSettings() {
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");

  return (
    <MenuButton class="button">
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
            <button
              class="button p-2"
              onClicked={() => toggleWindow("settings")}
              valign={Align.CENTER}
            >
              <image
                iconName="sliders-01"
                pixelSize={icons((i) => i.pixelSize.small)}
              />
            </button>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
