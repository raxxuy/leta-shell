import GLib from "gi://GLib";

export const hashPath = (path: string): string | null =>
  GLib.compute_checksum_for_string(GLib.ChecksumType.SHA256, path, -1);
