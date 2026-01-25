import { For } from "ags";
import type GObject from "ags/gobject";
import clsx from "clsx/lite";
import Battery from "@/modules/bar/Battery";
import Bluetooth from "@/modules/bar/Bluetooth";
import Client from "@/modules/bar/Client";
import Clock from "@/modules/bar/Clock";
import KeyboardLayout from "@/modules/bar/KeyboardLayout";
import Launcher from "@/modules/bar/Launcher";
import Notifications from "@/modules/bar/Notifications";
import QuickSettings from "@/modules/bar/QuickSettings";
import Sound from "@/modules/bar/Sound";
import Tray from "@/modules/bar/Tray";
import Workspaces from "@/modules/bar/Workspaces";
import ConfigManager from "@/services/configs";

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
  const window = ConfigManager.bind("bar", "window");
  const spacings = ConfigManager.bind("global", "spacings");

  const classNames = window((w) =>
    clsx(
      "bg-background-dark/80 shadow-md",
      w.floating ? "mx-2 my-1 rounded-lg px-2 py-1.5" : "px-4",
    ),
  );

  const Section = ({ type }: { type: "start" | "center" | "end" }) => {
    const layout = ConfigManager.bind("bar", `layout.${type}`);

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
