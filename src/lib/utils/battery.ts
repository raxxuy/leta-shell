import type AstalBattery from "gi://AstalBattery";
import { formatSeconds } from "@/lib/utils";

export const formatPercentage = (percentage: number): string =>
  `${Math.floor(percentage * 100)}%`;

export const timeTo = (
  charging: boolean,
  battery: AstalBattery.Device,
): string => {
  const label = charging ? "Time to full" : "Time to empty";
  const time = charging ? battery.timeToFull : battery.timeToEmpty;
  return `${label}: ${formatSeconds(time, "%hh %mm")}`;
};
