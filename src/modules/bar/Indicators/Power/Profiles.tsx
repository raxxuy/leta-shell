import { Align, Orientation } from "@/enums";
import usePowerProfiles from "@/hooks/features/power/usePowerProfiles";
import useSpacing from "@/hooks/services/useSpacing";
import ProfileButton from "./ProfileButton";

export default function Profiles() {
  const spacing = useSpacing();
  const { profiles, setActiveProfile } = usePowerProfiles();

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      <label class="opacity-80" halign={Align.START} label="Power profile" />
      <box orientation={Orientation.VERTICAL} spacing={spacing.sm}>
        {profiles.map(({ profile }) => (
          <ProfileButton
            onClicked={() => setActiveProfile(profile)}
            profile={profile}
          />
        ))}
      </box>
    </box>
  );
}
