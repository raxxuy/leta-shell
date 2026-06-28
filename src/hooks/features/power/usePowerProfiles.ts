import AstalPowerProfiles from "gi://AstalPowerProfiles";
import { createBinding } from "ags";

export const usePowerProfiles = () => {
  const powerProfiles = AstalPowerProfiles.get_default();
  const profiles = powerProfiles.get_profiles();

  const activeProfile = createBinding(powerProfiles, "activeProfile");

  const setActiveProfile = (profile: string) =>
    (powerProfiles.activeProfile = profile);

  return { profiles, activeProfile, setActiveProfile };
};
