import type AstalWp from "gi://AstalWp";
import { createBinding } from "ags";
import Button from "@/components/button/Button";
import { CURSORS } from "@/constants";
import { Align, EllipsizeMode } from "@/enums";
import ConfigManager from "@/services/configs";

interface EndpointListItemProps {
  endpoint: AstalWp.Endpoint;
}

export default function EndpointListItem({ endpoint }: EndpointListItemProps) {
  const icons = ConfigManager.bind("global", "icons");
  const spacings = ConfigManager.bind("global", "spacings");
  const isDefault = createBinding(endpoint, "isDefault");

  const iconName = isDefault((d) => (d ? "check" : "circle"));

  const handleClick = () => endpoint.set_is_default(true);

  return (
    <box spacing={spacings((s) => s.small)}>
      <Button
        class="px-2 py-1"
        cursor={CURSORS.pointer}
        onClicked={handleClick}
      >
        <label
          ellipsize={EllipsizeMode.END}
          halign={Align.START}
          label={endpoint.description}
          maxWidthChars={30}
          tooltipText={endpoint.description}
        />
      </Button>
      <image iconName={iconName} pixelSize={icons((i) => i.pixelSize.small)} />
    </box>
  );
}
