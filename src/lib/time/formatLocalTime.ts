import GLib from "gi://GLib";

export const formatLocalTime = (time: number, format = "%H:%M") =>
  GLib.DateTime.new_from_unix_local(time).format(format);
