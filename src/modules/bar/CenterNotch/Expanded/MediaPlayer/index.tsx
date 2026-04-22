import { Align, Orientation } from "@/enums";
import { useSpacing } from "@/hooks/useSpacing";
import AudioVisualizer from "./AudioVisualizer";
import CovertArt from "./CovertArt";
import PlaybackControls from "./PlaybackControls";
import TrackInfo from "./TrackInfo";

export default function MediaPlayer() {
  const spacing = useSpacing();

  return (
    <box class="min-w-xl" spacing={spacing.md}>
      {/* IMAGE */}
      <box class="min-w-26" halign={Align.START} valign={Align.CENTER}>
        <CovertArt />
      </box>

      {/* TITLE, PLAYER, PLAYBACK, CONTROLS */}
      <box
        class="min-w-92"
        halign={Align.CENTER}
        orientation={Orientation.VERTICAL}
        spacing={spacing.lg}
        valign={Align.CENTER}
      >
        <TrackInfo />
        <PlaybackControls />
      </box>

      {/* AUDIO VISUALIZER */}
      <box class="min-w-26" halign={Align.END} valign={Align.END}>
        <AudioVisualizer />
      </box>
    </box>
  );
}
