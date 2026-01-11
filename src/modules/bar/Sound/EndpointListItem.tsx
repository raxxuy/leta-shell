import type AstalWp from "gi://AstalWp";
import { createBinding } from "ags";
import { CURSORS } from "@/constants";
import { Align, EllipsizeMode } from "@/enums";
import { getConfig } from "@/lib/config";

const { icons, spacings } = getConfig("global");

interface EndpointListItemProps {
  endpoint: AstalWp.Endpoint;
}

export default function EndpointListItem({ endpoint }: EndpointListItemProps) {
  const isDefault = createBinding(endpoint, "isDefault");

  return (
    <box spacing={spacings.small}>
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
        pixelSize={icons.pixelSize.small}
      />
    </box>
  );
}
