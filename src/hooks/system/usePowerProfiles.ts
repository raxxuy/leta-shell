import AstalPowerProfiles from "gi://AstalPowerProfiles";
import { createBinding } from "ags";
import clsx from "clsx/lite";

const icons: Record<string, string> = {
  "power-saver": "feather",
  balanced: "scales-02",
  performance: "lightning-01",
};

export default function usePowerProfiles() {
  const powerProfiles = AstalPowerProfiles.get_default();
  const profiles = powerProfiles.get_profiles();

  const setActiveProfile = (profile: string) =>
    powerProfiles.set_active_profile(profile);

  return { profiles, setActiveProfile };
}

export const usePowerProfile = (profile: string) => {
  const powerProfiles = AstalPowerProfiles.get_default();
  const iconName = icons[profile];

  const activeProfile = createBinding(powerProfiles, "activeProfile");

  const className = activeProfile((ap) =>
    clsx(
      "rounded-lg px-3 py-2 border transition-colors",
      ap === profile
        ? "border-(--tertiary)/20 bg-(--primary)/20 hover:bg-(--primary)/30 active:bg-(--primary)/40"
        : "border-white/10 bg-zinc-900/80 hover:bg-zinc-800/80 active:bg-zinc-700/80",
    ),
  );

  return { className, iconName };
};
