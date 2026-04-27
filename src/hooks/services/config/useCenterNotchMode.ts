import { CenterNotchModeEnum } from "@/lib/config/schemas/modules/center-notch";
import useConfig from "./useConfig";

export default function useCenterNotchMode() {
  const [mode, setMode] = useConfig("bar", "settings.centerNotch.mode");
  const modes = CenterNotchModeEnum.options;

  const switchMode = (direction: 1 | -1) => {
    const next =
      (modes.indexOf(mode.peek()) + direction + modes.length) % modes.length;
    setMode(modes[next]);
  };

  const selectMode = (mode: (typeof modes)[number]) => setMode(mode);

  return { mode, selectMode, switchMode, modes };
}
