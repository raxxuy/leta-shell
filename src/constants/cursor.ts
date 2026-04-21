import { Gdk } from "ags/gtk4";

const createCursor = (name: string): Gdk.Cursor =>
  Gdk.Cursor.new_from_name(name, null);

export const DEFAULT = createCursor("default");
export const POINTER = createCursor("pointer");
export const TEXT = createCursor("text");
export const GRAB = createCursor("grab");
export const GRABBING = createCursor("grabbing");
