import AstalApps from "gi://AstalApps";
import { createState, For, type Setter } from "ags";
import type { Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import { configs } from "@/lib/config";
import LauncherItem from "@/modules/launcher/LauncherItem";

interface LauncherModuleProps {
  setEntry: Setter<Gtk.Entry | null>;
}

const {
  spacing,
  search: { width },
  list: { delay, height, spacing: listSpacing },
} = configs.launcher.content;

export default function LauncherModule({ setEntry }: LauncherModuleProps) {
  const apps = new AstalApps.Apps();
  const [list, setList] = createState<AstalApps.Application[]>([]);

  const handleSearch = (text: string) => {
    setList(text ? apps.fuzzy_query(text) : []);
  };

  return (
    <box
      class="launcher-content"
      valign={Align.CENTER}
      halign={Align.CENTER}
      orientation={Orientation.VERTICAL}
      spacing={spacing}
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
        $={setEntry}
        class="launcher-entry"
        halign={Align.CENTER}
        widthRequest={width}
        onNotifyText={({ text }) => handleSearch(text)}
        placeholderText="Start typing to search"
      />
    </box>
  );
}
