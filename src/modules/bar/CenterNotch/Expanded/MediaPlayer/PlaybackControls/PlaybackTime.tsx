import type AstalMpris from "gi://AstalMpris";
import { Align } from "@/enums";
import usePlayback from "@/hooks/services/mpris/usePlayback";

interface PlaybackTimeProps {
  player: AstalMpris.Player;
}

export default function PlaybackTime({ player }: PlaybackTimeProps) {
  const { formattedLength, formattedPosition } = usePlayback(player);

  return (
    <box hexpand>
      <label
        class="text-sm text-zinc-200"
        halign={Align.START}
        hexpand
        label={formattedPosition}
        xalign={0}
      />
      <label
        class="text-sm text-zinc-200"
        halign={Align.END}
        label={formattedLength}
        xalign={1}
      />
    </box>
  );
}
