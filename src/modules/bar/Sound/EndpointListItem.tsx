import type AstalWp from "gi://AstalWp";
import { createBinding } from "ags";
import { Button } from "@/components/button";
import { Cursors } from "@/constants";
import { Align, EllipsizeMode } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";

interface EndpointListItemProps {
  endpoint: AstalWp.Endpoint;
}

export default function EndpointListItem({ endpoint }: EndpointListItemProps) {
  const { spacing, iconSize } = useGlobalConfig();
  const isDefault = createBinding(endpoint, "isDefault");
  const iconName = isDefault((d) => (d ? "check" : "circle"));

  const handleClick = () => endpoint.set_is_default(true);

  return (
    <box spacing={spacing("small")}>
      <Button
        class="px-2 py-1"
        cursor={Cursors.POINTER}
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
      <image iconName={iconName} pixelSize={iconSize("small")} />
    </box>
  );
}
