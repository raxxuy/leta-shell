import AstalApps from "gi://AstalApps";
import { createState, For } from "ags";
import type { Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import { configs } from "@/lib/config";
import LauncherItem from "@/modules/launcher/LauncherItem";

const {
  spacing,
  search: { width },
  list: { delay, height, spacing: listSpacing },
} = configs.launcher.content;

export default function LauncherModule() {
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
      class="launcher-content"
      valign={Align.CENTER}
      halign={Align.CENTER}
      orientation={Orientation.VERTICAL}
      spacing={spacing}
      onNotifyVisible={handleNotifyVisible}
    >
      <scrolledwindow
        hexpand
        vexpand
        class="launcher-scrollwindow"
        heightRequest={height}
      >
        <box
          class="launcher-list"
          spacing={listSpacing}
          orientation={Orientation.VERTICAL}
        >
          <For each={list}>
            {(app, index) => (
              <LauncherItem app={app} delay={index.get() * delay} />
            )}
          </For>
        </box>
      </scrolledwindow>
      <entry
        $={(self) => {
          entry = self;
        }}
        class="launcher-entry"
        halign={Align.CENTER}
        widthRequest={width}
        onNotifyText={({ text }) => handleSearch(text)}
        placeholderText="Start typing to search"
      />
    </box>
  );
}
