import GLib from "gi://GLib";
import { FileTest } from "@/enums";

export const dirExists = (path: string): boolean =>
  GLib.file_test(path, FileTest.IS_DIR);
