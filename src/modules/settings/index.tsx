import { With } from "ags";
import { Orientation, Overflow } from "@/enums";
import useSettingsCategory, {
  type Category,
} from "@/hooks/features/settings/useSettingsCategory";
import { cleanupWidget } from "@/lib/theme";
import BarConfigProvider from "@/providers/BarConfigProvider";
import LauncherConfigProvider from "@/providers/LauncherConfigProvider";
import BarPanel from "./panels/BarPanel";
import LauncherPanel from "./panels/LauncherPanel";
import Sidebar from "./Sidebar";

interface SettingsModuleProps {
  height: number;
  width: number;
}

export default function SettingsModule({ width, height }: SettingsModuleProps) {
  const { active } = useSettingsCategory();

  const panels: Record<Category, JSX.Element> = {
    bar: <BarConfigProvider>{() => <BarPanel />}</BarConfigProvider>,
    global: <box></box>,
    launcher: (
      <LauncherConfigProvider>{() => <LauncherPanel />}</LauncherConfigProvider>
    ),
    wallpaper: <box></box>,
  };

  return (
    <box
      class="m-[5px_10px_15px] rounded-2xl border border-tertiary/20 bg-zinc-950/95 shadow-lg"
      heightRequest={height * 0.8}
      overflow={Overflow.HIDDEN}
      widthRequest={width * 0.6}
    >
      <Sidebar />
      <box class="p-4" hexpand orientation={Orientation.VERTICAL}>
        <With cleanup={cleanupWidget} value={active}>
          {(a) => panels[a]}
        </With>
      </box>
    </box>
  );
}
