import GLib from "gi://GLib";

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

export const formatLocalTime = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format);

export const formatUtcTime = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_utc(time).format(format);

export const now = (): GLib.DateTime => GLib.DateTime.new_now_local();
