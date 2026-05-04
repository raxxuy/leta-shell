import type AstalBluetooth from "gi://AstalBluetooth";
import { Align, Orientation } from "@/enums";
import useSpacing from "@/hooks/core/useSpacing";
import useBluetoothDevice from "@/hooks/features/bluetooth/useBluetoothDevice";
import { scan, setup } from "@/lib/theme";

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
      <box $={setup} class={dotClassName} valign={Align.CENTER} />
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
        class="rounded-lg border border-white/10 bg-zinc-900/80 px-2 py-1.5 transition-colors hover:bg-zinc-800/80 active:bg-zinc-700/80"
        focusable={false}
        onClicked={toggleConnection}
        valign={Align.CENTER}
      >
        <label class="text-[15px]" label={actionLabel} />
      </button>
    </box>
  );
}
