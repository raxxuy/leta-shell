import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed, For, With } from "ags";
import { CURSORS } from "@/constants";
import { Orientation } from "@/enums";
import { getIcon } from "@/lib/icons";
import { exec } from "@/lib/utils";
import PairedDevice from "@/modules/bar/Bluetooth/PairedDevice";
import ConfigManager from "@/services/configs";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const configManager = ConfigManager.get_default();
  const icons = configManager.bind("global", "icons");
  const spacings = configManager.bind("global", "spacings");
  const isPowered = createBinding(bluetooth, "isPowered");
  const pairedDevices = createBinding(
    bluetooth,
    "devices",
  )((devices) => devices.filter((device) => device.paired));

  const iconName = createComputed(() => getIcon("bluetooth", isPowered()));

  return (
    <MenuButton class="button">
      <image
        iconName={iconName}
        pixelSize={icons((i) => i.pixelSize.small)}
        tooltipText={isPowered((p) => (p ? "Connected" : "Disconnected"))}
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
                  <button
                    class="button"
                    cursor={CURSORS.pointer}
                    label="Enable Bluetooth"
                    onClicked={() => {
                      exec(["rfkill", "unblock", "bluetooth"]);
                      bluetooth.adapter.powered = true;
                    }}
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
