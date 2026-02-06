import GLib from "gi://GLib";

export const formatVolume = (volume: number): string =>
  `${Math.round(volume * 100)}%`;

export const formatPercentage = (percentage: number): string =>
  `${Math.floor(percentage * 100)}%`;

export const formatSeconds = (
  seconds: number,
  format: string = "%H:%M",
  local: boolean = false,
): string => {
  const date = local
    ? GLib.DateTime.new_from_unix_local(seconds)
    : GLib.DateTime.new_from_unix_utc(seconds);
  return date.format(format) || "";
};

export const now = (format?: string): GLib.DateTime | string => {
  const date = GLib.DateTime.new_now_local();
  return format ? (date.format(format) ?? "") : date;
};
