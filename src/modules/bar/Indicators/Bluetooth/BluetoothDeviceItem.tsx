import type AstalBluetooth from "gi://AstalBluetooth";
import { Align, Orientation } from "@/enums";
import useBluetoothDevice from "@/hooks/features/bluetooth/useBluetoothDevice";
import useSpacing from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";

export default function BluetoothDeviceItem({
  device,
}: {
  device: AstalBluetooth.Device;
}) {
  const spacing = useSpacing();
  const {
    name,
    hasPercentage,
    actionLabel,
    connectionLabel,
    batteryPercentageLabel,
    dotClassName,
    toggleConnection,
  } = useBluetoothDevice(device);

  return (
    <box $={scan} spacing={spacing.md}>
      <box class={dotClassName} valign={Align.CENTER} />
      <box hexpand orientation={Orientation.VERTICAL}>
        <label class="font-medium" halign={Align.START} label={name} />
        <box spacing={spacing.sm} valign={Align.CENTER}>
          <label
            class="text-[15px] opacity-50"
            halign={Align.START}
            label={connectionLabel}
          />
          <label
            class="text-[15px] opacity-50"
            label={batteryPercentageLabel}
            visible={hasPercentage}
          />
        </box>
      </box>
      <button
        class="button-outline-custom"
        focusable={false}
        onClicked={toggleConnection}
        valign={Align.CENTER}
      >
        <label class="text-[15px]" label={actionLabel} />
      </button>
    </box>
  );
}
