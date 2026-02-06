import GLib from "gi://GLib";
import { FileTest } from "@/enums";
import { exec } from "./shell";

export const pathExists = (path: string, isDir = false): boolean =>
  GLib.file_test(path, isDir ? FileTest.IS_DIR : FileTest.EXISTS);

export const fileExists = (path: string): boolean => pathExists(path);
export const dirExists = (path: string): boolean => pathExists(path, true);

export const ensureDir = (path: string): void => {
  if (!pathExists(path, true)) {
    GLib.mkdir_with_parents(path, 0o755);
  }
};

export const buildPath = (...segments: string[]): string =>
  GLib.build_filenamev(segments);

export const writeFile = (path: string, content: string): void => {
  GLib.file_set_contents(path, content);
};

export const readFile = (path: string): string => {
  if (!fileExists(path)) return "";
  const [success, contents] = GLib.file_get_contents(path);
  return success ? new TextDecoder().decode(contents) : "";
};

export const readDir = async (path: string): Promise<string[]> => {
  if (!dirExists(path)) return [];

  try {
    const files = await exec(["ls", path]);
    return files.split("\n");
  } catch (error) {
    console.error(`Error reading directory ${path}:`, error);
    return [];
  }
};
