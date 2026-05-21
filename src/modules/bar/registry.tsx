import type { BarWidget } from "@/lib/config/schemas/bar";
import CenterNotch from "./CenterNotch";
import Clock from "./Clock";
import Indicators from "./Indicators";
import Settings from "./Settings";
import Tray from "./Tray";
import Workspaces from "./Workspaces";

export const widgetRegistry: Record<BarWidget, () => JSX.Element> = {
  "center-notch": () => <CenterNotch />,
  clock: () => <Clock />,
  indicators: () => <Indicators />,
  settings: () => <Settings />,
  tray: () => <Tray />,
  workspaces: () => <Workspaces />,
};
