import { getConfig } from "@/lib/config";
import Settings from "@/modules/bar//Settings";
import Battery from "@/modules/bar/Battery";
import Bluetooth from "@/modules/bar/Bluetooth";
import Dashboard from "@/modules/bar/Dashboard";
import Notifications from "@/modules/bar/Notifications";
import Sound from "@/modules/bar/Sound";
import Tray from "@/modules/bar/Tray";
import Workspaces from "@/modules/bar/Workspaces";

const { spacings } = getConfig("bar");

const Section = ({
  type,
  className,
  children,
}: {
  type: "start" | "center" | "end";
  className: string;
  children: JSX.Element | JSX.Element[];
}) => (
  <box $type={type} class={className} spacing={spacings.medium}>
    {children}
  </box>
);

export default function BarModule() {
  return (
    <centerbox class="bar-module-container">
      <Section type="start" className="bar-module-left">
        <Workspaces />
        <Tray />
      </Section>

      <Section type="center" className="bar-module-center">
        <Dashboard />
      </Section>

      <Section type="end" className="bar-module-right">
        <Battery />
        <Sound />
        <Bluetooth />
        <Notifications />
        <Settings />
      </Section>
    </centerbox>
  );
}
