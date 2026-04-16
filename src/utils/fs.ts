import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { FileTest } from "@/enums";

export const fileExists = (path: string): boolean =>
  GLib.file_test(path, FileTest.EXISTS);

export const dirExists = (path: string): boolean =>
  GLib.file_test(path, FileTest.IS_DIR);

export const ensureDir = (path: string): boolean =>
  dirExists(path) || GLib.mkdir_with_parents(path, 0o755) === 0;

export const buildPath = (...segments: string[]): string =>
  GLib.build_filenamev(segments);

export const writeFile = (path: string, content: string): boolean =>
  GLib.file_set_contents(path, content);

export const readFile = (path: string): string | null => {
  if (!fileExists(path)) return null;
  const decoder = new TextDecoder();
  const [success, contents] = GLib.file_get_contents(path);
  return success ? decoder.decode(contents) : null;
};

export const listDir = (path: string): string[] | null => {
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
      files.push(info.get_name());
    }
    return files;
  } catch {
    return null;
  }
};
