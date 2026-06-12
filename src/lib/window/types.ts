import type { Gtk } from "ags/gtk4";

export type WindowWithClose = Gtk.Window & { requestClose: () => void };
