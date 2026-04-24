import type AstalMpris from "gi://AstalMpris";
import { Orientation } from "@/enums";
import { usePlayback } from "@/hooks/services/mpris/usePlayback";
import { useSliderDrag } from "@/hooks/ui/useSliderDrag";

interface PlaybackSliderProps {
  player: AstalMpris.Player;
}

export const PlaybackSlider = ({ player }: PlaybackSliderProps) => {
  const { length, position } = usePlayback(player);

  const { displayPosition, handleChange, handleDrag } = useSliderDrag((value) =>
    player.set_position(value),
  );

  const display = displayPosition(() => position());

  return (
    <slider
      class="playback-slider"
      hexpand
      max={length}
      min={0}
      onChangeValue={handleChange}
      onNotify={(_, event) => {
        if (event.name === "css-classes") handleDrag();
      }}
      orientation={Orientation.HORIZONTAL}
      value={display}
    />
  );
};
