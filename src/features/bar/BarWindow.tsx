import type { Gdk } from "ags/gtk4";
import app from "ags/gtk4/app";

import Window from "@/components/Window";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";
import CenterNotch from "./modules/CenterNotch";
import Clock from "./modules/Clock";
import SettingsToggler from "./modules/SettingsToggler";
import Tray from "./modules/Tray";
import Workspaces from "./modules/Workspaces";

const BarWindowInner = ({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) => {
  const { spacing, colors } = useTheme();

  const barClass = colors.base(
    (b) =>
      `animate-spring-in rounded-b-2xl border border-secondary/20 bg-${b} px-4 shadow-md`,
  );

  return (
    <Window
      anchor="top-full"
      application={app}
      exclusivity="exclusive"
      gdkmonitor={gdkmonitor}
      layer="top"
      name="bar"
      namespace="leta-shell"
      visible
    >
      <centerbox class="mx-4 -mt-px min-h-10">
        <box $type="start" class={barClass} spacing={spacing.lg}>
          <Workspaces />
          <Tray />
        </box>
        <box $type="center">
          <CenterNotch />
        </box>
        <box $type="end" class={barClass} spacing={spacing.lg}>
          <Clock />
          <SettingsToggler />
        </box>
      </centerbox>
    </Window>
  );
};

export default function BarWindow(gdkmonitor: Gdk.Monitor) {
  return (
    <ThemeProvider>
      {() => <BarWindowInner gdkmonitor={gdkmonitor} />}
    </ThemeProvider>
  );
}
