import AstalApps from "gi://AstalApps";
import { createState, For } from "ags";
import { type Gdk, Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import LauncherItem from "@/modules/launcher/LauncherItem";
import ConfigManager from "@/services/configs";

interface LauncherModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function LauncherModule({ gdkmonitor }: LauncherModuleProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const configManager = ConfigManager.get_default();
  const spacings = configManager.bind("global", "spacings");

  const [list, setList] = createState<AstalApps.Application[]>([]);
  const apps = new AstalApps.Apps();
  let entry: Gtk.Entry;

  const handleSearch = (text: string) => {
    setList(text ? apps.fuzzy_query(text) : []);
  };

  const init = (self: Gtk.Entry) => {
    entry = self;
    self.get_first_child()?.set_css_classes(["focus:text-foreground-lighter"]);
  };

  const handleNotifyVisible = ({ visible }: { visible: boolean }) => {
    if (!visible) {
      apps.reload();
      return;
    }

    entry.grab_focus();
    entry.set_text("");
  };

  return (
    <box
      class="rounded-2xl rounded-b-none border-2 border-background border-b-0 bg-background-dark/80 p-3 font-medium shadow"
      halign={Align.CENTER}
      onNotifyVisible={handleNotifyVisible}
      orientation={Orientation.VERTICAL}
      spacing={spacings((s) => s.large)}
      valign={Align.CENTER}
    >
      <box class="rounded-xl bg-background-dark/80">
        <scrolledwindow
          heightRequest={height / 2.12}
          hexpand
          vadjustment={Gtk.Adjustment.new(0, 0, 100, 1, 10, 0)}
          vexpand
        >
          <box
            class="first-child:mt-4 last-child:mb-4"
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.medium)}
          >
            <For each={list}>
              {(app, index) => <LauncherItem app={app} index={index} />}
            </For>
          </box>
        </scrolledwindow>
      </box>
      <entry
        $={init}
        class="rounded-xl bg-background-dark p-4"
        onNotifyText={({ text }) => handleSearch(text)}
        placeholderText="Start typing to search"
        widthRequest={width / 3.8}
      />
    </box>
  );
}
