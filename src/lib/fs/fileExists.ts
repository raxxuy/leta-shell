import GLib from "gi://GLib";
import { FileTest } from "@/enums";

export const fileExists = (path: string): boolean =>
  GLib.file_test(path, FileTest.EXISTS);
