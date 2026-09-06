import { onMount } from "ags";
import type { Gtk } from "ags/gtk4";

import Svg from "@/components/Svg";
import { Align, Overflow } from "@/enums";
import { getWindow } from "@/lib/window/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useLauncher } from "./useLauncher";

export default function LauncherSearch() {
  const { spacing, pixelSize } = useTheme();
  const { search, clear, activate } = useLauncher();

  let entryRef: Gtk.Entry;

  onMount(() => {
    const window = getWindow("launcher");
    window?.connect("notify::visible", () => {
      if (window.visible) entryRef.grab_focus();
      else {
        entryRef.set_text("");
        clear();
      }
    });
  });

  return (
    <box class="p-6" spacing={spacing.md} valign={Align.CENTER}>
      <Svg iconName="search" pixelSize={pixelSize.scale("sm", 1.25)} />
      <overlay overflow={Overflow.HIDDEN}>
        <entry
          $={(ref) => (entryRef = ref)}
          class="text-lg [&_placeholder]:opacity-80"
          hexpand
          onActivate={activate}
          onNotifyText={(self) => search(self.text)}
          placeholderText="Search for apps and commands..."
        />
      </overlay>
    </box>
  );
}
