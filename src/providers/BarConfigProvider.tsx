import {
  BarConfigContext,
  type BarConfigShape,
} from "@/contexts/BarConfigContext";
import useConfig from "@/hooks/services/useConfig";

interface BarConfigProviderProps {
  children: () => JSX.Element;
}

export default function BarConfigProvider({
  children,
}: BarConfigProviderProps) {
  const value: BarConfigShape = {
    position: useConfig("bar", "position"),
    height: useConfig("bar", "height"),
    layout: useConfig("bar", "layout"),
    clockFormat: useConfig("bar", "settings.clock.format"),
    workspaceCount: useConfig("bar", "settings.workspaces.count"),
    centerNotchMode: useConfig("bar", "settings.centerNotch.mode"),
    visualizerCount: useConfig(
      "bar",
      "settings.centerNotch.media.visualizer.count",
    ),
    visualizerEnabled: useConfig(
      "bar",
      "settings.centerNotch.media.visualizer.enabled",
    ),
    weatherInterval: useConfig("bar", "settings.centerNotch.weather.interval"),
    weatherUnit: useConfig("bar", "settings.centerNotch.weather.unit"),
  };

  return <BarConfigContext value={value}>{children}</BarConfigContext>;
}
