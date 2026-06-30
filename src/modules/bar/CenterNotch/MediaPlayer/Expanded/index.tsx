import { With } from "ags";
import { MprisContext } from "@/contexts/Mpris";
import { Align, Orientation } from "@/enums";
import { useSpacing } from "@/hooks/services/useSpacing";
import { cleanupWidget, scan } from "@/lib/theme";
import AudioVisualizer from "./AudioVisualizer";
import CovertArt from "./CovertArt";
import PlaybackControls from "./PlaybackControls";
import TrackInfo from "./TrackInfo";

export default function MediaExpanded() {
  const spacing = useSpacing();
  const { activePlayer } = MprisContext.use();

  return (
    <box class="min-w-lg" spacing={spacing.md}>
      {/* IMAGE */}
      <box class="min-w-26" halign={Align.START} valign={Align.CENTER}>
        <With cleanup={cleanupWidget} value={activePlayer}>
          {(player) =>
            player ? (
              <box $={scan}>
                <CovertArt player={player} />
              </box>
            ) : null
          }
        </With>
      </box>

      {/* TITLE, PLAYBACK CONTROLS */}
      <box
        class="min-w-92"
        halign={Align.CENTER}
        orientation={Orientation.VERTICAL}
        spacing={spacing.lg}
        valign={Align.CENTER}
      >
        <With cleanup={cleanupWidget} value={activePlayer}>
          {(player) =>
            player ? (
              <box
                $={scan}
                orientation={Orientation.VERTICAL}
                spacing={spacing.lg}
              >
                <TrackInfo player={player} />
                <PlaybackControls player={player} />
              </box>
            ) : null
          }
        </With>
      </box>

      {/* AUDIO VISUALIZER */}
      <box class="min-w-26" halign={Align.END} valign={Align.END}>
        <AudioVisualizer />
      </box>
    </box>
  );
}
