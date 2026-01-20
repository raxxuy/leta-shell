import type AstalWp from "gi://AstalWp";
import { createBinding } from "ags";
import { CURSORS } from "@/constants";
import { Align, EllipsizeMode } from "@/enums";
import ConfigManager from "@/services/configs";

interface EndpointListItemProps {
  endpoint: AstalWp.Endpoint;
}

export default function EndpointListItem({ endpoint }: EndpointListItemProps) {
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const isDefault = createBinding(endpoint, "isDefault");

  return (
    <box spacing={spacings((s) => s.small)}>
      <button
        class="button px-2 py-1"
        cursor={CURSORS.pointer}
        onClicked={() => {
          endpoint.isDefault = true;
        }}
      >
        <label
          ellipsize={EllipsizeMode.END}
          halign={Align.START}
          label={endpoint.description}
          maxWidthChars={30}
          tooltipText={endpoint.description}
        />
      </button>
      <image
        iconName={isDefault((d) => (d ? "check" : "circle"))}
        pixelSize={icons((i) => i.pixelSize.small)}
      />
    </box>
  );
}
