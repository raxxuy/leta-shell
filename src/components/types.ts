import type Gdk from "gi://Gdk?version=4.0";
import type Gtk from "gi://Gtk?version=4.0";
import type { MaybeAccessor } from "gnim";

export interface WindowProps {
  application: Gtk.Application;
  monitor: Gdk.Monitor;
  visible: MaybeAccessor<boolean>;
}
