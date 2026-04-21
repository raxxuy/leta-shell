import { useConfig } from "@/hooks/useConfig";
import { CenterNotchModeEnum } from "@/schemas/modules/center-notch";

export function useCenterNotchMode() {
  const [mode, setMode] = useConfig("bar", "settings.centerNotch.mode");
  const modes = CenterNotchModeEnum.options;

  const switchMode = (direction: 1 | -1) => {
    const next =
      (modes.indexOf(mode.peek()) + direction + modes.length) % modes.length;
    setMode(modes[next]);
  };

  const selectMode = (mode: (typeof modes)[number]) => setMode(mode);

  return { mode, setMode, switchMode, selectMode, modes };
}
