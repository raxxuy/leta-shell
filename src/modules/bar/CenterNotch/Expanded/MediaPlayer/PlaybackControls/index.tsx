import { With } from "ags";
import { Orientation } from "@/enums";
import { useActivePlayer } from "@/hooks/useActivePlayer";
import { useSpacing } from "@/hooks/useSpacing";
import { PlaybackButtons } from "./PlaybackButtons";
import { PlaybackSlider } from "./PlaybackSlider";
import PlaybackTime from "./PlaybackTime";

export default function PlaybackControls() {
  const spacing = useSpacing();
  const activePlayer = useActivePlayer();

  return (
    <box orientation={Orientation.VERTICAL}>
      <With value={activePlayer}>
        {(player) =>
          player ? (
            <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
              <PlaybackSlider player={player} />
              <PlaybackTime player={player} />
              <PlaybackButtons player={player} />
            </box>
          ) : null
        }
      </With>
    </box>
  );
}
