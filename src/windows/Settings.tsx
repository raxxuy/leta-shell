import { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import SettingsModule from "@/modules/settings";

export default function Settings() {
  return (
    <Gtk.Window
      application={app}
      class="settings"
      hideOnClose
      name="settings"
      visible={false}
    >
      <SettingsModule />
    </Gtk.Window>
  );
}
