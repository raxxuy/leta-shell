import { For } from "ags";
import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

import Popup from "@/components/Popup";
import { Align, Orientation } from "@/enums";
import { useTheme } from "@/providers/ThemeProvider";
import LauncherItem from "./LauncherItem";
import LauncherSearch from "./Search";
import { useLauncher } from "./useLauncher";

export default function LauncherWindow(gdkmonitor: Gdk.Monitor) {
  const { colors, spacing } = useTheme();
  const { results } = useLauncher();

  const hasResults = results((r) => r.length > 0);

  return (
    <Popup
      anchor="center"
      animation="popover"
      application={app}
      class="mt-72"
      exclusivity="ignore"
      gdkmonitor={gdkmonitor}
      keymode="exclusive"
      layer="overlay"
      name="launcher"
      namespace="leta-shell"
      valign={Align.START}
      visible={false}
    >
      <box
        class={colors.base(
          (b) =>
            `min-w-xl rounded-xl border border-tertiary/20 bg-${b} shadow-xl/20`,
        )}
        orientation={Orientation.VERTICAL}
      >
        <LauncherSearch />
        <box
          class="mx-4 rounded-full border border-white/8"
          visible={hasResults}
        />
        <box
          class="my-2 px-4 pt-1 pb-2"
          orientation={Orientation.VERTICAL}
          spacing={spacing.xs}
          visible={hasResults}
        >
          <For each={results}>
            {(result) => <LauncherItem result={result} />}
          </For>
        </box>
      </box>
    </Popup>
  );
}
