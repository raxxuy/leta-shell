import { centerNotchState } from "./state";
import { useDerived } from "./useDerived";
import { useMode } from "./useMode";

export const useCenterNotch = () => {
  const mode = useMode();
  const derived = useDerived();

  return {
    state: centerNotchState,
    mode,
    ui: derived,
  };
};
