import AstalBattery from "gi://AstalBattery";
import { createBinding, createComputed } from "ags";
import { formatUtcTime } from "@/lib/time";

export default function useBattery() {
  const battery = AstalBattery.get_default();
  const charging = createBinding(battery, "charging");
  const isPresent = createBinding(battery, "isPresent");
  const percentage = createBinding(battery, "percentage");
  const timeToFull = createBinding(battery, "timeToFull");
  const timeToEmpty = createBinding(battery, "timeToEmpty");

  const formattedPercentage = percentage((p) => `${Math.floor(p * 100)}%`);

  const detailedLabel = createComputed(() => {
    const chargingLabel = charging() ? "Charging " : "Discharging";
    const timeLeftLabel = formatUtcTime(
      charging() ? timeToFull() : timeToEmpty(),
      "%-Hh %-Mm left",
    );

    return `${chargingLabel} ·  ${timeLeftLabel}`;
  });

  const iconName = createComputed(() => {
    const prct = percentage();

    if (charging()) return "battery-charging-01";
    if (prct <= 0.1) return "battery-empty";
    else if (prct <= 0.4) return "battery-low";
    else if (prct <= 0.8) return "battery-mid";
    return "battery-full";
  });

  return {
    charging,
    percentage,
    isPresent,
    formattedPercentage,
    iconName,
    detailedLabel,
  };
}
