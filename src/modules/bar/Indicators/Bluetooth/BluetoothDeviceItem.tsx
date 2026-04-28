import type AstalBluetooth from "gi://AstalBluetooth";
import { Align, Orientation } from "@/enums";
import useSpacing from "@/hooks/services/config/useSpacing";
import useBluetoothDevice from "@/hooks/system/useBluetoothDevice";
import { loadClasses } from "@/lib/theme";

export default function BluetoothDeviceItem({
  device,
}: {
  device: AstalBluetooth.Device;
}) {
  const spacing = useSpacing();
  const { name, actionLabel, connectionLabel, dotClassName, toggleConnection } =
    useBluetoothDevice(device);

  return (
    <box $={loadClasses(BluetoothDeviceItem)} spacing={spacing.md}>
      <box
        $={loadClasses(BluetoothDeviceItem, "bluetooth-device-dot")}
        class={dotClassName}
        valign={Align.CENTER}
      />
      <box hexpand orientation={Orientation.VERTICAL}>
        <label class="font-medium" halign={Align.START} label={name} />
        <label
          class="text-[15px] opacity-50"
          halign={Align.START}
          label={connectionLabel}
        />
      </box>
      <button
        class="rounded-lg border border-white/10 bg-zinc-900/80 px-2 py-1.5 hover:bg-zinc-800/80 active:bg-zinc-700/80"
        focusable={false}
        onClicked={toggleConnection}
        valign={Align.CENTER}
      >
        <label class="text-[15px]" label={actionLabel} />
      </button>
    </box>
  );
}
