import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";

export default function Settings() {
  return (
    <Gtk.Window
      visible={false}
      name="settings"
      class="settings"
      application={app}
      hideOnClose
    >
      hi
    </Gtk.Window>
  );
}
