import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import { Align, Orientation } from "@/enums";
import { useGlobalConfig } from "@/hooks/useConfig";
import { getIcon } from "@/lib/icons";
import { loadClasses } from "@/lib/styles";
import PlayerButtons from "./PlayerButtons";
import PlayerInfo from "./PlayerInfo";
import PlayerProgress from "./PlayerProgress";

interface PlayerControlsProps {
  player: AstalMpris.Player;
}

export default function PlayerControls({ player }: PlayerControlsProps) {
  const { spacing } = useGlobalConfig();

  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const playbackStatus = createBinding(player, "playbackStatus");

  const playbackIcon = playbackStatus((ps) =>
    getIcon({ type: "media", status: ps }),
  );

  return (
    <box
      $={loadClasses(PlayerControls)}
      $type="overlay"
      class="bg-background-dark/60 p-4"
      orientation={Orientation.VERTICAL}
      spacing={spacing("medium")}
      valign={Align.END}
    >
      <PlayerInfo artist={artist} title={title} />

      <PlayerProgress
        length={length}
        onSeek={(pos) => player.set_position(pos)}
        position={position}
      />

      <PlayerButtons
        length={length}
        onNext={() => player.next()}
        onPlayPause={() => player.play_pause()}
        onPrevious={() => player.previous()}
        playbackIcon={playbackIcon}
        position={position}
      />
    </box>
  );
}
