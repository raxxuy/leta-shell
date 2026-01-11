import type AstalBluetooth from "gi://AstalBluetooth";
import AstalMpris from "gi://AstalMpris";

const getVolumeIcon = (
  type: "speaker" | "microphone",
  volume: number,
  mute: boolean,
) => {
  const isSilent = volume === 0 || mute;

  if (type === "microphone") {
    return isSilent ? "microphone-off" : "microphone-on";
  }

  if (isSilent) return "volume-off";
  return volume < 0.5 ? "volume-min" : "volume-max";
};

const BATTERY_ICONS = [
  { max: 0.1, icon: "battery-empty-1" },
  { max: 0.4, icon: "battery-low-1" },
  { max: 0.8, icon: "battery-mid" },
  { max: 1.0, icon: "battery-full" },
] as const;

const getBatteryIcon = (percentage: number, charging: boolean) => {
  if (charging) return "battery-charging";
  
  return (
    BATTERY_ICONS.find(({ max }) => percentage < max)?.icon || "battery-full"
  );
};

const getBluetoothIcon = (powered: boolean) => {
  return powered ? "bluetooth-on" : "bluetooth-off";
};

const DEVICE_ICON_MAP: Record<string, string> = {
  phone: "phone-01",
  "audio-headset": "headphones",
};

const getBluetoothDeviceIcon = (
  type: "connectivity" | "device",
  device: AstalBluetooth.Device,
) => {
  if (type === "device") {
    return DEVICE_ICON_MAP[device.icon] || device.icon;
  }

  if (device.connecting) return "bluetooth-connect";
  return device.connected ? "check" : "";
};

const getMediaIcon = (status: AstalMpris.PlaybackStatus) => {
  const MEDIA_ICONS = {
    [AstalMpris.PlaybackStatus.PLAYING]: "pause-circle",
    [AstalMpris.PlaybackStatus.PAUSED]: "play-circle",
    [AstalMpris.PlaybackStatus.STOPPED]: "stop",
  };

  return MEDIA_ICONS[status] || "";
};

export function getIcon(
  type: "volume",
  subtype: "speaker" | "microphone",
  volume: number,
  mute: boolean,
): string;
export function getIcon(
  type: "battery",
  percentage: number,
  charging: boolean,
): string;
export function getIcon(type: "bluetooth", powered: boolean): string;
export function getIcon(
  type: "bluetooth-device",
  subtype: "connectivity" | "device",
  device: AstalBluetooth.Device,
): string;
export function getIcon(
  type: "media",
  status: AstalMpris.PlaybackStatus,
): string;
export function getIcon(type: string, ...args: unknown[]): string {
  switch (type) {
    case "volume":
      return getVolumeIcon(
        args[0] as "speaker" | "microphone",
        args[1] as number,
        args[2] as boolean,
      );
    case "battery":
      return getBatteryIcon(args[0] as number, args[1] as boolean);
    case "bluetooth":
      return getBluetoothIcon(args[0] as boolean);
    case "bluetooth-device":
      return getBluetoothDeviceIcon(
        args[0] as "connectivity" | "device",
        args[1] as AstalBluetooth.Device,
      );
    case "media":
      return getMediaIcon(args[0] as AstalMpris.PlaybackStatus);
    default:
      return "";
  }
}
