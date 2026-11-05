import GLib from "gi://GLib?version=2.0";

export const hashPath = (path: string): string | null =>
  GLib.compute_checksum_for_string(
    GLib.ChecksumType.SHA256,
    GLib.canonicalize_filename(path, null),
    -1,
  );
