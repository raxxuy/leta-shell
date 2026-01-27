import { createBinding, For, onCleanup } from "ags";
import { type Gdk, Gtk } from "ags/gtk4";
import { Align, InputHints, Orientation, Overflow, StateFlags } from "@/enums";
import { findWidget } from "@/lib/utils";
import ConfigService from "@/services/config";
import LauncherService from "@/services/launcher";
import LauncherItem from "./LauncherItem";

interface LauncherModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function LauncherModule({ gdkmonitor }: LauncherModuleProps) {
  const { width, height } = gdkmonitor.get_geometry();
  const launcherService = LauncherService.get_default();
  const spacings = ConfigService.bind("global", "spacings");
  const results = createBinding(launcherService, "results");

  let entry: Gtk.Entry;

  const init = (self: Gtk.Entry) => {
    entry = self;

    const text = findWidget(self, (w) => w.cssName === "text") as Gtk.Text;
    const placeholder = findWidget(self, (w) => w.cssName === "placeholder");
    placeholder?.set_css_classes(["text-foreground-dark"]);

    const handler = text.connect("state-flags-changed", () => {
      const isFocused = text.get_state_flags() & StateFlags.FOCUS_WITHIN;
      const classes = [
        isFocused ? "text-foreground-lighter" : "text-foreground-dark",
      ];
      text?.set_css_classes(classes);
    });

    onCleanup(() => self.disconnect(handler));
  };

  const handleNotifyVisible = ({ visible }: { visible: boolean }) => {
    if (visible) {
      entry.grab_focus();
    } else {
      entry.set_text("");
      launcherService.clear();
    }
  };

  const handleSearch = ({ text }: { text: string }) => {
    launcherService.search(text);
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
        class="bg-background-dark/95 px-8 py-6"
        inputHints={InputHints.NO_EMOJI}
        onNotifyText={handleSearch}
        placeholderText="Start typing to search..."
        widthRequest={width / 3.6}
      />
      <box
        class="border-background-light border-t-2 bg-background-dark/90"
        orientation={Orientation.VERTICAL}
        visible={results((r) => r.length > 0)}
      >
        <scrolledwindow
          class="p-4"
          hexpand
          maxContentHeight={height / 2.12}
          propagateNaturalHeight
          vadjustment={Gtk.Adjustment.new(0, 0, 100, 1, 10, 0)}
        >
          <box
            orientation={Orientation.VERTICAL}
            spacing={spacings((s) => s.medium)}
          >
            <For each={results}>
              {(result, index) => (
                <LauncherItem index={index} result={result} />
              )}
            </For>
          </box>
        </scrolledwindow>
      </box>
    </box>
  );
}
