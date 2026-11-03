import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";

export const buildPath = (...segments: string[]): string =>
  GLib.build_filenamev(segments);

export const dirExists = (path: string): boolean =>
  GLib.file_test(path, GLib.FileTest.IS_DIR);

export const ensureDir = (path: string): boolean =>
  dirExists(path) || GLib.mkdir_with_parents(path, 0o755) === 0;

export const listDir = (path: string, absolute = false): string[] | null => {
  if (!dirExists(path)) return null;

  try {
    const enumerator = Gio.File.new_for_path(path).enumerate_children(
      "standard::name",
      Gio.FileQueryInfoFlags.NONE,
      null,
    );

    const files: string[] = [];
    try {
      for (
        let info = enumerator.next_file(null);
        info;
        info = enumerator.next_file(null)
      ) {
        const name = info.get_name();
        files.push(absolute ? `${path}/${name}` : name);
      }
      return files;
    } finally {
      enumerator.close(null);
    }
  } catch {
    return null;
  }
};

export const fileExists = (path: string): boolean =>
  GLib.file_test(path, GLib.FileTest.EXISTS);

export const readFile = (path: string): string | null => {
  if (!fileExists(path)) return null;
  const [success, contents] = GLib.file_get_contents(path);
  return success ? new TextDecoder().decode(contents) : null;
};

export const writeFile = (path: string, content: string): boolean =>
  GLib.file_set_contents(path, new TextEncoder().encode(content));

export const copyFile = (source: string, destination: string): boolean =>
  Gio.File.new_for_path(source).copy(
    Gio.File.new_for_path(destination),
    Gio.FileCopyFlags.NONE,
    null,
    null,
  );
