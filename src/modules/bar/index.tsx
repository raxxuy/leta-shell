import type GObject from "ags/gobject";
import { getConfig } from "@/lib/config";
import { cls } from "@/lib/utils";
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

const { window, layout } = getConfig("bar");
const { spacings } = getConfig("global");

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

const Section = ({ type }: { type: "start" | "center" | "end" }) => (
  <box $type={type} spacing={spacings.medium}>
    {layout[type].map((moduleName: string) => {
      const Module = MODULES[moduleName];
      return Module ? <Module /> : null;
    })}
  </box>
);

export default function BarModule() {
  return (
    <centerbox
      class={cls(
        "bg-background-dark/80 shadow",
        window.floating ? "mx-2 my-1 rounded-lg px-2 py-1.5" : "px-4",
      )}
    >
      <Section type="start" />
      <Section type="center" />
      <Section type="end" />
    </centerbox>
  );
}
