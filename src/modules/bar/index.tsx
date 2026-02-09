import { For } from "ags";
import type GObject from "ags/gobject";
import clsx from "clsx/lite";
import { useBarConfig, useGlobalConfig } from "@/hooks/useConfig";
import { loadClasses } from "@/lib/styles";
import Battery from "./Battery";
import Bluetooth from "./Bluetooth";
import Client from "./Client";
import Clock from "./Clock";
import ControlCenter from "./ControlCenter";
import KeyboardLayout from "./KeyboardLayout";
import Launcher from "./Launcher";
import Notifications from "./Notifications";
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
  "control-center": ControlCenter,
};

export default function BarModule() {
  const { spacing } = useGlobalConfig();
  const { window, layout } = useBarConfig();

  const classNames = window((w) =>
    clsx(
      "bg-background-dark/80 shadow-md",
      w.floating ? "mx-2 my-1 rounded-lg px-2 py-1.5" : "px-4",
      w.border
        ? w.floating
          ? "border-2 border-primary"
          : `${w.anchor === "top" ? "border-b-2" : "border-t-2"} border-primary`
        : "",
    ),
  );

  const Section = ({ type }: { type: "start" | "center" | "end" }) => {
    return (
      <box $type={type} spacing={spacing("medium")}>
        <For each={layout[type]}>{(module) => MODULES[module]()}</For>
      </box>
    );
  };

  return (
    <centerbox $={loadClasses(BarModule)} class={classNames}>
      <Section type="start" />
      <Section type="center" />
      <Section type="end" />
    </centerbox>
  );
}
