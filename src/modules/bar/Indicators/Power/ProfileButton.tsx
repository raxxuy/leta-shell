import { startCase } from "es-toolkit";
import { Align } from "@/enums";
import usePixelSize from "@/hooks/services/config/usePixelSize";
import useSpacing from "@/hooks/services/config/useSpacing";
import { usePowerProfile } from "@/hooks/system/usePowerProfiles";
import { loadClasses } from "@/lib/theme";

interface ProfileButtonProps {
  onClicked: () => void;
  profile: string;
}

export default function ProfileButton({
  profile,
  onClicked,
}: ProfileButtonProps) {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { className, iconName } = usePowerProfile(profile);

  return (
    <button
      $={loadClasses(ProfileButton, "profile-button", true)}
      class={className}
      hexpand
      onClicked={onClicked}
    >
      <box hexpand spacing={spacing.lg} valign={Align.CENTER}>
        <label class="text-[15px] opacity-90" label={startCase(profile)} />
        <image
          halign={Align.END}
          hexpand
          iconName={iconName}
          pixelSize={pixelSize.sm}
        />
      </box>
    </button>
  );
}
