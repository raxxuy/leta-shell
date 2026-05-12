import useConfig from "@/hooks/services/useConfig";
import { CenterNotchModeEnum } from "@/lib/config/schemas/modules/center-notch";

export default function useCenterNotchMode() {
  const [mode, setMode] = useConfig("bar", "settings.centerNotch.mode");
  const modes = CenterNotchModeEnum.options;

  const switchMode = (direction: 1 | -1) => {
    const next =
      (modes.indexOf(mode.peek()) + direction + modes.length) % modes.length;
    setMode(modes[next]);
  };

  const selectMode = (nextMode: (typeof modes)[number]) => setMode(nextMode);

  return { mode, selectMode, switchMode, modes };
}
