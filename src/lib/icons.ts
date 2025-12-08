import type AstalBluetooth from "gi://AstalBluetooth";
import type AstalNetwork from "gi://AstalNetwork";

const getVolumeIcon = (
  type: "speaker" | "microphone",
  volume: number,
  mute: boolean,
) => {
  const isSilent = volume === 0 || mute;

  if (type === "speaker") {
    if (isSilent) return "volume-off";
    return volume < 0.5 ? "volume-min" : "volume-max";
  }

  return isSilent ? "microphone-off" : "microphone-on";
};

const getBatteryIcon = (percentage: number, charging: boolean) => {
  const THRESHOLDS = {
    LOW: 0.1,
    MID: 0.4,
    FULL: 0.8,
  };

  if (charging) return "battery-charging";
  if (percentage <= THRESHOLDS.LOW) return "battery-empty-1";
  if (percentage <= THRESHOLDS.MID) return "battery-low-1";
  if (percentage <= THRESHOLDS.FULL) return "battery-mid";
  return "battery-full";
};

const getBluetoothIcon = (powered: boolean) => {
  return powered ? "bluetooth-on" : "bluetooth-off";
};

const getBluetoothDeviceIcon = (
  type: "connectivity" | "device",
  device: AstalBluetooth.Device,
) => {
  if (type === "device") {
    switch (device.icon) {
      case "phone":
        return "phone-01";
      case "audio-headset":
        return "headphones";
    }
  }

  if (device.connecting) return "bluetooth-connect";
  return device.connected ? "check" : "";
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
export function getIcon(type: "network", network: AstalNetwork.Network): string;
export function getIcon(type: string, ...args: any[]): string {
  switch (type) {
    case "volume":
      return getVolumeIcon(args[0], args[1], args[2]);
    case "battery":
      return getBatteryIcon(args[0], args[1]);
    case "bluetooth":
      return getBluetoothIcon(args[0]);
    case "bluetooth-device":
      return getBluetoothDeviceIcon(args[0], args[1]);
    default:
      return "";
  }
}
