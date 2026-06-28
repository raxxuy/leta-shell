import { createComputed } from "ags";
import { useBattery } from "./useBattery";
import { usePowerProfiles } from "./usePowerProfiles";

const icons: Record<string, string> = {
  "power-saver": "feather",
  balanced: "scales-02",
  performance: "lightning-01",
};

export const usePower = () => {
  const { isPresent, iconName: batteryIconName } = useBattery();
  const { activeProfile } = usePowerProfiles();

  const iconName = createComputed(() =>
    isPresent() ? batteryIconName() : icons[activeProfile()],
  );

  return { iconName };
};
