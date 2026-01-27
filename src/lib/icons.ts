import type AstalBluetooth from "gi://AstalBluetooth";
import AstalMpris from "gi://AstalMpris";

type IconParams =
  | {
      type: "volume";
      subtype: "speaker" | "microphone";
      volume: number;
      mute: boolean;
    }
  | { type: "battery"; percentage: number; charging: boolean }
  | { type: "bluetooth"; powered: boolean }
  | {
      type: "bluetooth-device";
      subtype: "connectivity" | "device";
      device: AstalBluetooth.Device;
    }
  | { type: "media"; status: AstalMpris.PlaybackStatus };

const BATTERY_ICONS = [
  { max: 0.1, icon: "battery-empty" },
  { max: 0.4, icon: "battery-low" },
  { max: 0.8, icon: "battery-mid" },
  { max: 1.0, icon: "battery-full" },
] as const;

const DEVICE_ICON_MAP: Record<string, string> = {
  phone: "device-phone",
  "audio-headset": "device-headphones",
};

const MEDIA_ICONS = {
  [AstalMpris.PlaybackStatus.PLAYING]: "media-pause",
  [AstalMpris.PlaybackStatus.PAUSED]: "media-play",
  [AstalMpris.PlaybackStatus.STOPPED]: "media-stop",
} as const;

export function getIcon(params: IconParams): string {
  switch (params.type) {
    case "volume": {
      const { subtype, volume, mute } = params;
      const isSilent = volume === 0 || mute;

      if (subtype === "microphone") {
        return isSilent ? "microphone-off" : "microphone-on";
      }

      if (isSilent) return "audio-volume-off";
      return volume < 0.5 ? "audio-volume-min" : "audio-volume-max";
    }

    case "battery": {
      const { percentage, charging } = params;
      if (charging) return "battery-charging";

      return (
        BATTERY_ICONS.find(({ max }) => percentage < max)?.icon ||
        "battery-full"
      );
    }

    case "bluetooth":
      return params.powered ? "bluetooth-on" : "bluetooth-off";

    case "bluetooth-device": {
      const { subtype, device } = params;

      if (subtype === "device") {
        return DEVICE_ICON_MAP[device.icon] || device.icon;
      }

      if (device.connecting) return "bluetooth-connect";
      return device.connected ? "check" : "";
    }

    case "media":
      return MEDIA_ICONS[params.status] || "";

    default:
      return "";
  }
}
