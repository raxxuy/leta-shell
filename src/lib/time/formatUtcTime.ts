import GLib from "gi://GLib";

export const formatUtcTime = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_utc(time).format(format);
