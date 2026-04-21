import GLib from "gi://GLib";
import { dirExists } from "./dirExists";

export const ensureDir = (path: string): boolean =>
  dirExists(path) || GLib.mkdir_with_parents(path, 0o755) === 0;
