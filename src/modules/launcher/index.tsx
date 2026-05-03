import { For, onMount } from "ags";
import type { Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { Align, Orientation } from "@/enums";
import usePixelSize from "@/hooks/services/config/usePixelSize";
import useSpacing from "@/hooks/services/config/useSpacing";
import useLauncher from "@/hooks/services/useLauncher";
import LauncherItem from "./LauncherItem";

interface LauncherModuleProps {
  width: number;
}

export default function LauncherModule({ width }: LauncherModuleProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { results, clear, search } = useLauncher();

  let entryRef: Gtk.Entry;

  const resultsVisible = results((r) => r.length > 0);

  return (
    <box
      $={() => {
        onMount(() => {
          const window = app.get_window("launcher");
          window?.connect("notify::visible", () => {
            if (window.visible) entryRef.grab_focus();
            else {
              entryRef.set_text("");
              clear();
            }
          });
        });
      }}
      class="m-[5px_10px_15px] rounded-2xl border border-tertiary/20 bg-zinc-950/95 shadow-lg"
      halign={Align.CENTER}
      orientation={Orientation.VERTICAL}
      widthRequest={width * 0.29}
    >
      <box class="p-6" spacing={spacing.md} valign={Align.CENTER}>
        <image
          class="opacity-40"
          iconName="search-md"
          pixelSize={pixelSize.scale("sm", 1.25)}
        />
        <entry
          $={(self) => (entryRef = self)}
          class="text-lg [&_placeholder]:opacity-80"
          hexpand
          maxLength={26}
          onActivate={() => results.peek()[0].activate()}
          onNotifyText={(self) => search(self.text)}
          placeholderText="Search for apps and commands..."
        />
      </box>
      <box
        class="mx-4 rounded-full border border-white/8"
        visible={resultsVisible}
      />
      <box
        class="my-2 px-4 pt-1 pb-2"
        orientation={Orientation.VERTICAL}
        spacing={spacing.xs}
        visible={resultsVisible}
      >
        <For each={results}>{(result) => <LauncherItem result={result} />}</For>
      </box>
    </box>
  );
}
