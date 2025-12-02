const THRESHOLDS = {
  LOW: 0.05,
  MID: 0.3,
  FULL: 0.7,
};

export const getBatteryIcon = (
  percentage: number,
  charging: boolean,
): string => {
  if (charging) return "battery-charging-symbolic";
  if (percentage <= THRESHOLDS.LOW) return "battery-empty-1-symbolic";
  if (percentage <= THRESHOLDS.MID) return "battery-low-1-symbolic";
  if (percentage <= THRESHOLDS.FULL) return "battery-mid-symbolic";
  return "battery-full-symbolic";
};

export const formatPercentage = (percentage: number): string =>
  `${Math.floor(percentage * 100)}%`;
