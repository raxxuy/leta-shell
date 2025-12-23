import { inRange } from "es-toolkit";
import type AstalBluetooth from "gi://AstalBluetooth";
import AstalMpris from "gi://AstalMpris";

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
  if (inRange(percentage, 0, THRESHOLDS.LOW)) return "battery-empty-1";
  if (inRange(percentage, THRESHOLDS.LOW, THRESHOLDS.MID))
    return "battery-low-1";
  if (inRange(percentage, THRESHOLDS.MID, THRESHOLDS.FULL))
    return "battery-mid";
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

const getMediaIcon = (status: AstalMpris.PlaybackStatus) => {
  switch (status) {
    case AstalMpris.PlaybackStatus.PLAYING:
      return "pause-circle";
    case AstalMpris.PlaybackStatus.PAUSED:
      return "play-circle";
    case AstalMpris.PlaybackStatus.STOPPED:
      return "stop";
    default:
      return "";
  }
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
