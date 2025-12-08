import type AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed } from "ags";
import { CURSORS } from "@/constants";
import { Align } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";

const { icons, spacings } = getConfig("bar");

interface PairedDeviceProps {
  device: AstalBluetooth.Device;
}

export default function PairedDevice({ device }: PairedDeviceProps) {
  const connected = createBinding(device, "connected");
  const connecting = createBinding(device, "connecting");

  const deviceIcon = getIcon("bluetooth-device", "device", device);

  const connectedIcon = createComputed(() => {
    connected();
    connecting();
    return getIcon("bluetooth-device", "connectivity", device);
  });

  const handleClick = () => {
    if (connected()) {
      device.disconnect_device(() => {});
    } else {
      device.connect_device(() => {});
    }
  };

  return (
    <box class="paired-device" spacing={spacings.small}>
      <button
        class="device-button button"
        onClicked={handleClick}
        cursor={CURSORS.pointer}
      >
        <label class="device-name" label={device.name} halign={Align.START} />
      </button>
      <box class="icons">
        <image
          class="device-icon"
          iconName={deviceIcon}
          pixelSize={icons.pixelSize.small}
        />
        <image
          class="connected-icon"
          iconName={connectedIcon}
          pixelSize={icons.pixelSize.small}
        />
      </box>
    </box>
  );
}
