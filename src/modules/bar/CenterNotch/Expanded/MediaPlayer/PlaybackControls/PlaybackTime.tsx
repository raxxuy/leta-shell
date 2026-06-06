import type AstalMpris from "gi://AstalMpris";
import usePlayback from "@/hooks/features/media/usePlayback";

interface PlaybackTimeProps {
  player: AstalMpris.Player;
}

export default function PlaybackTime({ player }: PlaybackTimeProps) {
  const { formattedLength, formattedPosition } = usePlayback(player);

  return (
    <box hexpand>
      <label
        class="text-sm text-zinc-200"
        label={formattedPosition}
        xalign={0}
      />
      <box hexpand /> {/* spacer */}
      <label class="text-sm text-zinc-200" label={formattedLength} xalign={1} />
    </box>
  );
}
