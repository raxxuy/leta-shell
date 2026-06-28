import type AstalMpris from "gi://AstalMpris";
import { Orientation } from "@/enums";
import { useSpacing } from "@/hooks/services/useSpacing";
import { PlaybackButtons } from "./PlaybackButtons";
import { PlaybackSlider } from "./PlaybackSlider";
import PlaybackTime from "./PlaybackTime";

interface PlaybackControlsProps {
  player: AstalMpris.Player;
}

export default function PlaybackControls({ player }: PlaybackControlsProps) {
  const spacing = useSpacing();

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
      <PlaybackSlider player={player} />
      <PlaybackTime player={player} />
      <PlaybackButtons player={player} />
    </box>
  );
}
