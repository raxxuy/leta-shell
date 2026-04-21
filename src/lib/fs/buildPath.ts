import GLib from "gi://GLib";

export const buildPath = (...segments: string[]): string =>
  GLib.build_filenamev(segments);
