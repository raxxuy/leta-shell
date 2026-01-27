import type AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed } from "ags";
import { Button } from "@/components/button";
import { CURSORS } from "@/constants";
import { Align } from "@/enums";
import { getIcon } from "@/lib/icons";
import { loadClasses } from "@/lib/styles";
import ConfigService from "@/services/config";

interface PairedDeviceProps {
  device: AstalBluetooth.Device;
}

export default function PairedDevice({ device }: PairedDeviceProps) {
  const icons = ConfigService.bind("global", "icons");
  const spacings = ConfigService.bind("global", "spacings");
  const connected = createBinding(device, "connected");
  const connecting = createBinding(device, "connecting");

  const deviceIcon = getIcon({
    type: "bluetooth-device",
    subtype: "device",
    device: device,
  });

  const connectedIcon = createComputed(() => {
    connected();
    connecting();
    return getIcon({
      type: "bluetooth-device",
      subtype: "connectivity",
      device: device,
    });
  });

  const handleClick = () => {
    if (connected()) device.disconnect_device(() => {});
    else device.connect_device(() => {});
  };

  return (
    <box $={loadClasses(PairedDevice)} spacing={spacings((s) => s.small)}>
      <Button
        class="px-2 py-1"
        cursor={CURSORS.pointer}
        onClicked={handleClick}
      >
        <label halign={Align.START} label={device.name} xalign={0} />
      </Button>
      <box>
        <image
          iconName={deviceIcon}
          pixelSize={icons((i) => i.pixelSize.small)}
        />
        <image
          iconName={connectedIcon}
          pixelSize={icons((i) => i.pixelSize.small)}
        />
      </box>
    </box>
  );
}
