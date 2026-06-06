import { BarConfigContext } from "@/contexts/BarConfigContext";
import { CenterNotchModeEnum } from "@/lib/config/schemas/bar/modules/center-notch";

export const useMode = () => {
  const { centerNotchMode } = BarConfigContext.use();
  const [value, setValue] = centerNotchMode;

  const modes = CenterNotchModeEnum.options;

  const select = (mode: (typeof modes)[number]) => setValue(mode);

  const cycle = (direction: 1 | -1) => {
    const current = modes.indexOf(value.peek());
    const next = (current + direction + modes.length) % modes.length;
    setValue(modes[next]);
  };

  const is = (mode: (typeof modes)[number]) => value((v) => v === mode);

  return {
    value,
    modes,
    select,
    cycle,
    is,
  };
};
