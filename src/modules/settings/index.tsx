import { With } from "ags";
import { Orientation, Overflow } from "@/enums";
import useSettingsCategory, {
  type Category,
} from "@/hooks/features/settings/useSettingsCategory";
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
    bar: <BarPanel />,
    global: <box></box>,
    launcher: <LauncherPanel />,
    wallpaper: <box></box>,
  };

  return (
    <box
      class="m-[5px_10px_15px] rounded-2xl border border-tertiary/20 bg-zinc-950/95 shadow-lg"
      heightRequest={height * 0.8}
      overflow={Overflow.HIDDEN}
      widthRequest={width * 0.8}
    >
      <Sidebar />
      <box class="p-4" hexpand orientation={Orientation.VERTICAL}>
        <With value={active}>{(a) => panels[a]}</With>
      </box>
    </box>
  );
}
