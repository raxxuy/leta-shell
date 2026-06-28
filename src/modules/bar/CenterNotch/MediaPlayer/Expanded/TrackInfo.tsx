import type AstalMpris from "gi://AstalMpris";
import { Orientation } from "@/enums";
import { useTrackInfo } from "@/hooks/features/media/useTrackInfo";

interface TrackInfoProps {
  player: AstalMpris.Player;
}

export default function TrackInfo({ player }: TrackInfoProps) {
  const { title, artist } = useTrackInfo(player);

  return (
    <box hexpand orientation={Orientation.VERTICAL}>
      <label class="font-bold text-lg" label={title} />
      <label class="font-semibold text-sm" label={artist} />
    </box>
  );
}
