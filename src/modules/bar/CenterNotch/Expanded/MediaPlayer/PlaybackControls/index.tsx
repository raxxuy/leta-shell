import { With } from "ags";
import { MprisContext } from "@/contexts/MprisContext";
import { Orientation } from "@/enums";
import { useSpacing } from "@/hooks/services/useSpacing";
import { cleanupWidget, scan } from "@/lib/theme";
import { PlaybackButtons } from "./PlaybackButtons";
import { PlaybackSlider } from "./PlaybackSlider";
import PlaybackTime from "./PlaybackTime";

export default function PlaybackControls() {
  const spacing = useSpacing();
  const { activePlayer } = MprisContext.use();

  return (
    <box orientation={Orientation.VERTICAL}>
      <With cleanup={cleanupWidget} value={activePlayer}>
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
