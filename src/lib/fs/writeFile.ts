import GLib from "gi://GLib";

export const writeFile = (path: string, content: string): boolean =>
  GLib.file_set_contents(path, content);
