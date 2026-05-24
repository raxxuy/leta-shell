import { With } from "ags";
import useBarConfig from "@/hooks/services/config/useBarConfig";
import useSpacing from "@/hooks/services/useSpacing";
import type { BarWidget } from "@/lib/config/schemas/bar";
import { cleanupWidget, scan } from "@/lib/theme";
import CenterNotch from "./CenterNotch";
import Clock from "./Clock";
import Indicators from "./Indicators";
import Settings from "./Settings";
import Tray from "./Tray";
import Workspaces from "./Workspaces";

const widgetRegistry: Record<BarWidget, () => JSX.Element> = {
  "center-notch": () => CenterNotch(),
  clock: () => Clock(),
  indicators: () => Indicators(),
  settings: () => Settings(),
  tray: () => Tray(),
  workspaces: () => Workspaces(),
};

export default function BarModule() {
  const spacing = useSpacing();
  const {
    layout: [layout],
    containerClassName,
  } = useBarConfig();

  return (
    <With cleanup={cleanupWidget} value={layout}>
      {({ left, center, right }) => (
        <centerbox $={scan} class="mb-0.5 px-4" hexpand>
          <box $type="start" class={containerClassName} spacing={spacing.xl}>
            {left.map((name) => widgetRegistry[name]())}
          </box>
          <box $type="center">
            {center.map((name) => widgetRegistry[name]())}
          </box>
          <box $type="end" class={containerClassName} spacing={spacing.xl}>
            {right.map((name) => widgetRegistry[name]())}
          </box>
        </centerbox>
      )}
    </With>
  );
}
