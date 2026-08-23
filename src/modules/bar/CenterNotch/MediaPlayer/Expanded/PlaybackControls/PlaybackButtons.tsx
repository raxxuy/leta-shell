import type AstalMpris from "gi://AstalMpris";
import { Cursor } from "@/constants";
import { Align } from "@/enums";
import usePlayback from "@/hooks/features/media/usePlayback";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { useSpacing } from "@/hooks/services/useSpacing";
import type { Reactive } from "@/types/reactive";

interface PlaybackButtonsProps {
  player: AstalMpris.Player;
}

interface MediaButtonProps {
  iconName: Reactive<string>;
  onClick: () => void;
  pixelSize: Reactive<number>;
}

const MediaButton = ({ iconName, onClick, pixelSize }: MediaButtonProps) => (
  <button
    class="transition-transform hover:scale-110"
    cursor={Cursor.POINTER}
    focusable={false}
    onClicked={onClick}
  >
    <image iconName={iconName} pixelSize={pixelSize} />
  </button>
);

export const PlaybackButtons = ({ player }: PlaybackButtonsProps) => {
  const spacing = useSpacing();
  const pixelSize = usePixelSize();
  const { playbackIcon } = usePlayback(player);

  const size = pixelSize.scale("sm", 1.25);

  return (
    <box class="-mt-5.5" halign={Align.CENTER} hexpand spacing={spacing.md}>
      <MediaButton
        iconName="skip-back"
        onClick={() => player.previous()}
        pixelSize={size}
      />
      <MediaButton
        iconName={playbackIcon}
        onClick={() => player.play_pause()}
        pixelSize={size}
      />
      <MediaButton
        iconName="skip-forward"
        onClick={() => player.next()}
        pixelSize={size}
      />
    </box>
  );
};
