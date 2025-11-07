import GLib from "gi://GLib";

export const now = () => GLib.DateTime.new_now_local();
