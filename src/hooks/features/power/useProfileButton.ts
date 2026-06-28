import AstalPowerProfiles from "gi://AstalPowerProfiles";
import { createBinding } from "ags";
import clsx from "clsx/lite";

const icons: Record<string, string> = {
  "power-saver": "feather",
  balanced: "scales-02",
  performance: "lightning-01",
};

export const useProfileButton = (profile: string) => {
  const powerProfiles = AstalPowerProfiles.get_default();
  const iconName = icons[profile];

  const activeProfile = createBinding(powerProfiles, "activeProfile");

  const className = activeProfile((active) =>
    clsx(
      "rounded-lg px-3 py-2 border transition-colors",
      active === profile
        ? "border-tertiary/20 bg-primary/15 text-white active:bg-primary/25"
        : "border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60 active:bg-white/15 active:text-white/80",
    ),
  );

  return { className, iconName };
};
