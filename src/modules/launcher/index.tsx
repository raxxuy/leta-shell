import AstalApps from "gi://AstalApps";
import { createState, For, onCleanup } from "ags";
import { type Gdk, Gtk } from "ags/gtk4";
import { Align, Orientation, Overflow, StateFlags } from "@/enums";
import { findWidget } from "@/lib/utils";
import LauncherItem from "@/modules/launcher/LauncherItem";
import ConfigManager from "@/services/configs";

interface LauncherModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function LauncherModule({ gdkmonitor }: LauncherModuleProps) {
  const apps = new AstalApps.Apps();
  const { width, height } = gdkmonitor.get_geometry();
  const spacings = ConfigManager.bind("global", "spacings");

  const [list, setList] = createState<AstalApps.Application[]>([]);
  let entry: Gtk.Entry;

  const init = (self: Gtk.Entry) => {
    entry = self;

    const text = findWidget(self, (w) => w.cssName === "text");
    const placeholder = findWidget(self, (w) => w.cssName === "placeholder");

    const handler = self.connect("state-flags-changed", () => {
      const isFocused = self.get_state_flags() & StateFlags.FOCUS_WITHIN;
      const classes = [
        isFocused ? "text-foreground-lighter" : "text-foreground-dark",
      ];

      text?.set_css_classes(classes);
      placeholder?.set_css_classes(classes);
    });

    handleSearch(self);

    onCleanup(() => self.disconnect(handler));
  };

  const handleNotifyVisible = ({ visible }: { visible: boolean }) => {
    if (visible) {
      entry.grab_focus();
      entry.set_text("");
    } else apps.reload();
  };

  const handleSearch = ({ text }: { text: string }) => {
    setList(
      apps.exact_query(text).sort((a, b) => a.name.localeCompare(b.name)),
    );
  };

  return (
    <box
      class="rounded-xl border-1 border-background-light shadow-lg"
      halign={Align.CENTER}
      marginTop={height / 4}
      onNotifyVisible={handleNotifyVisible}
      orientation={Orientation.VERTICAL}
      overflow={Overflow.HIDDEN}
      valign={Align.START}
      vexpand
    >
      <entry
        $={init}
        class="bg-background-dark/90 px-8 py-6"
        onNotifyText={handleSearch}
        placeholderText="Start typing to search"
        widthRequest={width / 3.8}
      />
      <box
        class="border-background-light border-t-1 bg-background-dark/90 p-4"
        overflow={Overflow.HIDDEN}
        visible={list((l) => l.length > 0)}
      >
        <scrolledwindow
          hexpand
          maxContentHeight={height / 2.12}
          propagateNaturalHeight
          vadjustment={Gtk.Adjustment.new(0, 0, 100, 1, 10, 0)}
        >
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.medium)}
          >
            <For each={list}>
              {(app, index) => <LauncherItem app={app} index={index} />}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </box>
  );
}
