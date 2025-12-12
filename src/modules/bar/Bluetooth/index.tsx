import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed, For, With } from "ags";
import { CURSORS } from "@/constants";
import { Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import { getIcon } from "@/lib/icons";
import PairedDevice from "@/modules/bar/Bluetooth/PairedDevice";
import Container from "@/widgets/Container";
import MenuButton from "@/widgets/MenuButton";

const { icons, spacings } = getConfig("global");

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const isPowered = createBinding(bluetooth, "isPowered");
  const pairedDevices = createBinding(
    bluetooth,
    "devices",
  )((devices) => devices.filter((device) => device.paired));

  const iconName = createComputed(() => getIcon("bluetooth", isPowered()));

  return (
    <MenuButton class="bluetooth button">
      <image
        iconName={iconName}
        pixelSize={icons.pixelSize.small}
        tooltipText={isPowered((p) => (p ? "Connected" : "Disconnected"))}
      />
      <popover>
        <Container orientation={Orientation.VERTICAL}>
          <With value={isPowered}>
            {(isPowered) =>
              isPowered ? (
                <box
                  orientation={Orientation.VERTICAL}
                  spacing={spacings.medium}
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
                  spacing={spacings.medium}
                >
                  <label class="font-bold" label="Bluetooth is disabled" />
                  <button
                    label="Enable Bluetooth"
                    cursor={CURSORS.pointer}
                    onClicked={() => {
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
