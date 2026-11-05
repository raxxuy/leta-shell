import GLib from "gi://GLib?version=2.0";

export const now = () => GLib.DateTime.new_now_local();

export const formatTime = (
  date: GLib.DateTime | null,
  format: string = "%H:%M",
) => date?.format(format) ?? "";
