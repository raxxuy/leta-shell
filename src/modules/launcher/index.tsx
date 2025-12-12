import AstalApps from "gi://AstalApps";
import { createState, For } from "ags";
import type { Gdk, Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import { getConfig } from "@/lib/config";
import LauncherItem from "@/modules/launcher/LauncherItem";

const {
  modules: { items },
} = getConfig("launcher");
const { spacings } = getConfig("global");

interface LauncherModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function LauncherModule({ gdkmonitor }: LauncherModuleProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const apps = new AstalApps.Apps();
  const [list, setList] = createState<AstalApps.Application[]>([]);

  let entry: Gtk.Entry;

  const handleSearch = (text: string) => {
    setList(text ? apps.fuzzy_query(text) : []);
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
      class="bg-background-light/80 border-2 border-background-lighter rounded-2xl rounded-b-none border-b-0 p-3 font-medium"
      valign={Align.CENTER}
      halign={Align.CENTER}
      spacing={spacings.large}
      orientation={Orientation.VERTICAL}
      onNotifyVisible={handleNotifyVisible}
    >
      <box class="bg-background rounded-xl p-2">
        <scrolledwindow hexpand vexpand heightRequest={height / 2.12}>
          <box spacing={spacings.medium} orientation={Orientation.VERTICAL}>
            <For each={list}>
              {(app, index) => (
                <LauncherItem app={app} delay={index() * items.delay} />
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>
      <entry
        $={(self) => {
          entry = self;
          self
            .get_first_child()
            ?.set_css_classes(["focus:text-foreground-lighter"]);
        }}
        class="bg-background p-4 rounded-xl"
        widthRequest={width / 3.8}
        onNotifyText={({ text }) => handleSearch(text)}
        placeholderText="Start typing to search"
      />
    </box>
  );
}
