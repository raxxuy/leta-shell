import GLib from "gi://GLib";

export const now = (format?: string): GLib.DateTime | string | null => {
  const date = GLib.DateTime.new_now_local();
  return format ? date.format(format) : date;
};

export const formatSeconds = (
  seconds: number,
  format: string = "%H:%M",
): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const dateNow = now() as GLib.DateTime;
  const dateTime = GLib.DateTime.new_local(
    dateNow.get_year(),
    dateNow.get_month(),
    dateNow.get_day_of_month(),
    hours,
    minutes,
    secs,
  );

  return dateTime.format(format) || "";
};
