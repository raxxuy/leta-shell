import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, For, With } from "ags";
import Button from "@/components/button/Button";
import MenuButton from "@/components/button/MenuButton";
import Container from "@/components/Container";
import { CURSORS } from "@/constants";
import { Orientation } from "@/enums";
import { getIcon } from "@/lib/icons";
import { exec } from "@/lib/utils";
import PairedDevice from "@/modules/bar/Bluetooth/PairedDevice";
import ConfigManager from "@/services/configs";

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const icons = ConfigManager.bind("global", "icons");
  const spacings = ConfigManager.bind("global", "spacings");
  const isPowered = createBinding(bluetooth, "isPowered");
  const pairedDevices = createBinding(
    bluetooth,
    "devices",
  )((devices) => devices.filter((device) => device.paired));

  const iconName = isPowered((p) => getIcon("bluetooth", p));
  const tooltipText = isPowered((p) => (p ? "Connected" : "Disconnected"));

  const handleClick = () => {
    exec(["rfkill", "unblock", "bluetooth"]);
    bluetooth.adapter.set_powered(true);
  };

  return (
    <MenuButton>
      <image
        iconName={iconName}
        pixelSize={icons((i) => i.pixelSize.small)}
        tooltipText={tooltipText}
      />
      <popover>
        <Container orientation={Orientation.VERTICAL}>
          <With value={isPowered}>
            {(isPowered) =>
              isPowered ? (
                <box
                  orientation={Orientation.VERTICAL}
                  spacing={spacings((s) => s.medium)}
                >
                  <label class="font-bold" label="Paired devices" />
                  <For each={pairedDevices}>
                    {(device) => <PairedDevice device={device} />}
                  </For>
                </box>
              ) : (
                <box
                  class="bluetooth-disabled"
                  orientation={Orientation.VERTICAL}
                  spacing={spacings((s) => s.medium)}
                >
                  <label class="font-bold" label="Bluetooth is disabled" />
                  <Button
                    cursor={CURSORS.pointer}
                    label="Enable Bluetooth"
                    onClicked={handleClick}
                  />
                </box>
              )
            }
          </With>
        </Container>
      </popover>
    </MenuButton>
  );
}
