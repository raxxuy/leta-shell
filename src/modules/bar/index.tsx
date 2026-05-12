import useSpacing from "@/hooks/services/useSpacing";
import CenterNotch from "./CenterNotch";
import Clock from "./Clock";
import Indicators from "./Indicators";
import Settings from "./Settings";
import Tray from "./Tray";
import Workspaces from "./Workspaces";

export default function BarModule() {
  const spacing = useSpacing();

  return (
    <centerbox class="mb-0.5 px-4">
      <box $type="start" class="bar-container" spacing={spacing.xl}>
        <Workspaces />
        <Tray />
      </box>
      <box $type="center">
        <CenterNotch />
      </box>
      <box $type="end" class="bar-container" spacing={spacing.xl}>
        <Indicators />
        <Clock />
        <Settings />
      </box>
    </centerbox>
  );
}
