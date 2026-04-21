import GLib from "gi://GLib";
import { fileExists } from "./fileExists";

export const readFile = (path: string): string | null => {
  if (!fileExists(path)) return null;
  const decoder = new TextDecoder();
  const [success, contents] = GLib.file_get_contents(path);
  return success ? decoder.decode(contents) : null;
};
