import { With } from "ags";
import { Orientation } from "@/enums";
import useMpris from "@/hooks/services/useMpris";
import useSpacing from "@/hooks/services/useSpacing";
import { scan } from "@/lib/theme";
import { PlaybackButtons } from "./PlaybackButtons";
import { PlaybackSlider } from "./PlaybackSlider";
import PlaybackTime from "./PlaybackTime";

export default function PlaybackControls() {
  const spacing = useSpacing();
  const { activePlayer } = useMpris();

  return (
    <box orientation={Orientation.VERTICAL}>
      <With value={activePlayer}>
        {(player) =>
          player ? (
            <box
              $={scan}
              orientation={Orientation.VERTICAL}
              spacing={spacing.md}
            >
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
