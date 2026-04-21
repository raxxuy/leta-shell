import Gio from "gi://Gio";
import { dirExists } from "./dirExists";

export const listDir = (path: string, absolute = false): string[] | null => {
  if (!dirExists(path)) return null;

  try {
    const dir = Gio.File.new_for_path(path);
    const enumerator = dir.enumerate_children(
      "standard::name",
      Gio.FileQueryInfoFlags.NONE,
      null,
    );

    const files: string[] = [];

    while (true) {
      const info = enumerator.next_file(null);
      if (!info) break;

      const name = info.get_name();

      files.push(absolute ? `${path}/${name}` : name);
    }

    return files;
  } catch {
    return null;
  }
};
