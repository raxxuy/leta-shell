import Graphene from "gi://Graphene";
import { For } from "ags";
import { type Gdk, Gtk } from "ags/gtk4";
import { Align, InputHints, Orientation, Overflow } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { useLauncher } from "@/hooks/useLauncher";
import { toggleWindow } from "@/utils";
import LauncherItem from "./LauncherItem";

interface LauncherModuleProps {
  gdkmonitor: Gdk.Monitor;
}

export default function LauncherModule({ gdkmonitor }: LauncherModuleProps) {
  const { spacing } = useGlobalConfig();
  const { clear, search, results } = useLauncher();
  const { width, height } = gdkmonitor.get_geometry();

  let entry: Gtk.Entry;
  let box: Gtk.Box;
  const scrollMargin = height / 4;
  const searchWidth = width / 3.6;
  const maxResultsHeight = height / 2.12;

  const boxInit = (self: Gtk.Box) => {
    box = self;
  };

  const entryInit = (self: Gtk.Entry) => {
    entry = self;
  };

  const handlePress = (
    _e: Gtk.GestureClick,
    _: number,
    x: number,
    y: number,
  ) => {
    const [, rect] = box.compute_bounds(box.parent);
    const position = new Graphene.Point({ x, y });

    if (!rect.contains_point(position)) {
      toggleWindow("launcher");
      return true;
    }
  };

  const handleNotifyVisible = ({ visible }: { visible: boolean }) => {
    if (visible) {
      entry.grab_focus();
    } else {
      entry.set_text("");
      clear();
    }
  };

  const handleActivate = () => results()[0]?.execute();
  const handleSearch = ({ text }: { text: string }) => search(text);

  return (
    <>
      <Gtk.GestureClick onPressed={handlePress} />
      <box
        $={boxInit}
        class="rounded-xl border-1 border-background-light border-t-2 bg-background-lighter/40 shadow-lg"
        halign={Align.CENTER}
        marginTop={scrollMargin}
        onNotifyVisible={handleNotifyVisible}
        orientation={Orientation.VERTICAL}
        overflow={Overflow.HIDDEN}
        valign={Align.START}
        vexpand
      >
        <entry
          $={entryInit}
          class="bg-background-dark/95 px-8 py-6"
          inputHints={InputHints.NO_EMOJI}
          onActivate={handleActivate}
          onNotifyText={handleSearch}
          placeholderText="Start typing to search..."
          widthRequest={searchWidth}
        />
        <box
          class="border-background-light border-t-2 bg-background-dark/90"
          orientation={Orientation.VERTICAL}
          visible={results((r) => r.length > 0)}
        >
          <scrolledwindow
            class="p-4"
            hexpand
            maxContentHeight={maxResultsHeight}
            propagateNaturalHeight
            vadjustment={Gtk.Adjustment.new(0, 0, 100, 1, 10, 0)}
          >
            <box orientation={Orientation.VERTICAL} spacing={spacing("medium")}>
              <For each={results}>
                {(result) => <LauncherItem entry={entry} result={result} />}
              </For>
            </box>
          </scrolledwindow>
        </box>
      </box>
    </>
  );
}
