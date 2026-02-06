import type AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed } from "ags";
import { Button } from "@/components/button";
import { Cursors } from "@/constants";
import { Align } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { getIcon } from "@/lib/icons";
import { loadClasses } from "@/lib/styles";

interface PairedDeviceProps {
  device: AstalBluetooth.Device;
}

export default function PairedDevice({ device }: PairedDeviceProps) {
  const { spacing, iconSize } = useGlobalConfig();
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
    <box $={loadClasses(PairedDevice)} spacing={spacing("small")}>
      <Button
        class="px-2 py-1"
        cursor={Cursors.POINTER}
        onClicked={handleClick}
      >
        <label halign={Align.START} label={device.name} xalign={0} />
      </Button>
      <box>
        <image iconName={deviceIcon} pixelSize={iconSize("small")} />
        <image iconName={connectedIcon} pixelSize={iconSize("small")} />
      </box>
    </box>
  );
}
