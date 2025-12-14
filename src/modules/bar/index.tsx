import { getConfig } from "@/lib/config";
import { cls } from "@/lib/utils";
import Settings from "@/modules/bar//Settings";
import Battery from "@/modules/bar/Battery";
import Bluetooth from "@/modules/bar/Bluetooth";
import Dashboard from "@/modules/bar/Dashboard";
import Launcher from "@/modules/bar/Launcher";
import Notifications from "@/modules/bar/Notifications";
import Sound from "@/modules/bar/Sound";
import Tray from "@/modules/bar/Tray";
import Workspaces from "@/modules/bar/Workspaces";

const { extras } = getConfig("bar");
const { spacings } = getConfig("global");

const Section = ({
  type,
  className,
  children,
}: {
  type: "start" | "center" | "end";
  className: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <box
    $type={type}
    class={cls(
      className,
      extras.container.enabled && "bg-background/80 px-2 rounded-b-lg",
    )}
    spacing={spacings.medium}
  >
    {children}
  </box>
);

export default function BarModule() {
  return (
    <centerbox
      class={cls(
        "bg-background-dark/80 px-4",
        extras.container.enabled && "bg-transparent",
      )}
    >
      <Section type="start" className="bar-left">
        <Launcher />
        <Workspaces />
        <Tray />
      </Section>

      <Section type="center" className="bar-middle">
        <Dashboard />
      </Section>

      <Section type="end" className="bar-right">
        <Battery />
        <Sound />
        <Bluetooth />
        <Notifications />
        <Settings />
      </Section>
    </centerbox>
  );
}
