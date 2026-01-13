import { Align, Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import { toggleWindow } from "@/lib/utils";
import Media from "@/modules/bar/QuickSettings/Media";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const { icons, spacings } = getConfig("global");

export default function QuickSettings() {
  return (
    <MenuButton class="button">
      <image iconName="settings" pixelSize={icons.pixelSize.small} />
      <popover>
        <Container class="p-0.5">
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacings.medium}
            widthRequest={300}
          >
            <Media />
          </box>
          <box
            class="px-1 py-4"
            orientation={Orientation.VERTICAL}
            spacing={spacings.small}
            valign={Align.CENTER}
          >
            <button
              class="button p-2"
              onClicked={() => toggleWindow("settings")}
              valign={Align.CENTER}
            >
              <image iconName="sliders-01" pixelSize={icons.pixelSize.small} />
            </button>
          </box>
        </Container>
      </popover>
    </MenuButton>
  );
}
