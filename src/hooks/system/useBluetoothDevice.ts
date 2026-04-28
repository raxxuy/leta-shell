import type AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed } from "ags";
import clsx from "clsx/lite";

export default function useBluetoothDevice(device: AstalBluetooth.Device) {
  const rawName = createBinding(device, "name");
  const paired = createBinding(device, "paired");
  const connected = createBinding(device, "connected");
  const connecting = createBinding(device, "connecting");
  const batteryPercentage = createBinding(device, "batteryPercentage");

  const name = rawName((n) => n ?? "");
  const actionLabel = connected((c) => (c ? "Disconnect" : "Connect"));

  const connectionLabel = createComputed(() => {
    if (connecting()) return "Connecting...";
    if (connected()) return "Connected";
    return "Available";
  });

  const dotClassName = connected((c) =>
    clsx(
      "rounded-full min-w-3 min-h-3",
      c ? "bg-(--primary)/80" : "bg-zinc-700",
    ),
  );

  const toggleConnection = () => {
    if (connected.peek()) device.disconnect_device(() => {});
    else device.connect_device(() => {});
  };

  return {
    name,
    paired,
    connected,
    connecting,
    batteryPercentage,
    connectionLabel,
    dotClassName,
    actionLabel,
    toggleConnection,
  };
}
