import AstalBluetooth from "gi://AstalBluetooth";
import { createBinding, createComputed } from "ags";
import Toggler from "../Toggler";

export default function Bluetooth() {
  const bluetooth = AstalBluetooth.get_default();
  const isPowered = createBinding(bluetooth, "isPowered");

  const iconName = createComputed(() => {
    return isPowered() ? "bluetooth-on-symbolic" : "bluetooth-off-symbolic";
  });

  const handleNotifyActive = () => bluetooth.toggle();

  return (
    <Toggler
      iconName={iconName}
      initActive={isPowered()}
      onNotifyActive={handleNotifyActive}
    />
  );
}
