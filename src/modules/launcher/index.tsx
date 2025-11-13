import AstalApps from "gi://AstalApps";
import { createState, For, type Setter } from "ags";
import { Gtk } from "ags/gtk4";
import { Align, Orientation } from "@/enums";
import LauncherItem from "@/modules/launcher/LauncherItem";

interface LauncherProps {
  setEntry: Setter<Gtk.Entry | null>;
}

export default function Launcher({ setEntry }: LauncherProps) {
  const apps = new AstalApps.Apps();
  const [list, setList] = createState<AstalApps.Application[]>([]);

  function search(text: string) {
    if (text === "") setList([]);
    else setList(apps.fuzzy_query(text));
  }

  return (
    <box
      heightRequest={640}
      widthRequest={400}
      spacing={20}
      class="launcher-content"
      valign={Align.CENTER}
      halign={Align.CENTER}
      orientation={Orientation.VERTICAL}
    >
      <scrolledwindow class="launcher-scrollwindow" hexpand vexpand>
        <box
          spacing={10}
          class="launcher-list"
          orientation={Orientation.VERTICAL}
        >
          <For each={list}>{(app) => <LauncherItem app={app} />}</For>
        </box>
      </scrolledwindow>
      <Gtk.Separator visible={list((l) => l.length > 0)} />
      <entry
        widthRequest={500}
        $={setEntry}
        halign={Align.CENTER}
        class="launcher-entry"
        onNotifyText={({ text }) => search(text)}
        placeholderText="Start typing to search"
      />
    </box>
  );
}
