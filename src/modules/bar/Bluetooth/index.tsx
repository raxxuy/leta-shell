import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, For, With } from "ags";
import { Button, MenuButton } from "@/components/button";
import Container from "@/components/Container";
import { Cursors } from "@/constants";
import { Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { getIcon } from "@/lib/icons";
import { exec } from "@/utils";
import PairedDevice from "./PairedDevice";

export default function Bluetooth() {
  const { spacing, iconSize } = useGlobalConfig();
  const bluetooth = AstalBluetooth.get_default();
  const isPowered = createBinding(bluetooth, "isPowered");
  const pairedDevices = createBinding(
    bluetooth,
    "devices",
  )((devices) => devices.filter((device) => device.paired));

  const iconName = isPowered((p) => getIcon({ type: "bluetooth", powered: p }));
  const tooltipText = isPowered((p) =>
    p ? "Bluetooth enabled" : "Bluetooth disabled",
  );

  const handleClick = () => {
    exec(["rfkill", "unblock", "bluetooth"]);
    bluetooth.adapter.set_powered(true);
  };

  return (
    <MenuButton>
      <image
        class="w-6"
        iconName={iconName}
        pixelSize={iconSize("small")}
        tooltipText={tooltipText}
      />
      <popover>
        <Container orientation={Orientation.VERTICAL}>
          <With value={isPowered}>
            {(isPowered) =>
              isPowered ? (
                <box
                  orientation={Orientation.VERTICAL}
                  spacing={spacing("medium")}
                >
                  <label class="font-bold" label="Paired devices" />
                  <With value={pairedDevices}>
                    {(devices) =>
                      devices.length > 0 ? (
                        <box>
                          <For each={pairedDevices}>
                            {(device) => <PairedDevice device={device} />}
                          </For>
                        </box>
                      ) : (
                        <label
                          class="text-on-surface/60"
                          label="No paired devices"
                        />
                      )
                    }
                  </With>
                </box>
              ) : (
                <box
                  orientation={Orientation.VERTICAL}
                  spacing={spacing("medium")}
                >
                  <label class="font-bold" label="Bluetooth is disabled" />
                  <Button
                    cursor={Cursors.POINTER}
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
