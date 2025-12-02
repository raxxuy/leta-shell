import GLib from "gi://GLib";

export const now = (format?: string): GLib.DateTime | string | null => {
  const date = GLib.DateTime.new_now_local();
  return format ? date.format(format) : date;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.round(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};
