import { For } from "ags";
import type GObject from "ags/gobject";
import clsx from "clsx/lite";
import ConfigService from "@/services/config";
import Battery from "./Battery";
import Bluetooth from "./Bluetooth";
import Client from "./Client";
import Clock from "./Clock";
import KeyboardLayout from "./KeyboardLayout";
import Launcher from "./Launcher";
import Notifications from "./Notifications";
import QuickSettings from "./QuickSettings";
import Sound from "./Sound";
import Tray from "./Tray";
import Workspaces from "./Workspaces";

const MODULES: Record<string, () => GObject.Object> = {
  launcher: Launcher,
  workspaces: Workspaces,
  tray: Tray,
  clock: Clock,
  client: Client,
  battery: Battery,
  sound: Sound,
  bluetooth: Bluetooth,
  notifications: Notifications,
  "keyboard-layout": KeyboardLayout,
  "quick-settings": QuickSettings,
};

export default function BarModule() {
  const window = ConfigService.bind("bar", "window");
  const spacings = ConfigService.bind("global", "spacings");

  const classNames = window((w) =>
    clsx(
      "bg-background-dark/80 shadow-md",
      w.floating ? "mx-2 my-1 rounded-lg px-2 py-1.5" : "px-4",
    ),
  );

  const Section = ({ type }: { type: "start" | "center" | "end" }) => {
    const layout = ConfigService.bind("bar", `layout.${type}`);

    return (
      <box $type={type} spacing={spacings((s) => s.medium)}>
        <For each={layout}>{(module) => MODULES[module]()}</For>
      </box>
    );
  };

  return (
    <centerbox class={classNames}>
      <Section type="start" />
      <Section type="center" />
      <Section type="end" />
    </centerbox>
  );
}
