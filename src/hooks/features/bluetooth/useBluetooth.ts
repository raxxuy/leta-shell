import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding } from "ags";
import clsx from "clsx/lite";

export default function useBluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const devices = createBinding(bluetooth, "devices");
  const isPowered = createBinding(bluetooth, "isPowered");
  const isConnected = createBinding(bluetooth, "isConnected");
  const discovering = createBinding(bluetooth.adapter, "discovering");

  const powerIcon = isPowered((p) => (p ? "bluetooth-on" : "bluetooth-off"));
  const discoveringLabel = discovering((d) =>
    d ? "Scanning..." : "Click to scan",
  );

  const buttonClassName = discovering((d) =>
    clsx(
      "rounded-lg py-1.5 border border-white/10 transition-colors",
      d
        ? "animate-pulse bg-primary/20 hover:bg-primary/30 active:bg-primary/40"
        : "animate-none bg-white/5 hover:bg-white/10 active:bg-white/15",
    ),
  );

  const togglePower = (state: boolean) => {
    if (state !== isPowered.peek()) bluetooth.adapter.powered = state;
  };

  const toggleScanning = () => {
    if (discovering.peek()) bluetooth.adapter.stop_discovery();
    else bluetooth.adapter.start_discovery();
  };

  return {
    devices,
    isPowered,
    isConnected,
    powerIcon,
    discoveringLabel,
    buttonClassName,
    togglePower,
    toggleScanning,
  };
}
