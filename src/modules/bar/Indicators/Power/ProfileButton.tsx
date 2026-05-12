import { startCase } from "es-toolkit";
import { Align } from "@/enums";
import { usePowerProfile } from "@/hooks/features/power/usePowerProfiles";
import usePixelSize from "@/hooks/services/usePixelSize";
import useSpacing from "@/hooks/services/useSpacing";

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
    <button class={className} hexpand onClicked={onClicked}>
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
