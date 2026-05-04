import type AstalMpris from "gi://AstalMpris";
import clsx from "clsx/lite";
import { Orientation } from "@/enums";
import usePlayback from "@/hooks/features/center-notch/media/usePlayback";
import useSliderDrag from "@/hooks/ui/interactions/useSliderDrag";

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
      class={clsx(
        "min-h-2 rounded-full bg-white/15",
        "[&_highlight]:rounded-full [&_highlight]:bg-white/90",
        "[&_slider]:-my-px [&_slider]:min-h-1.5 [&_slider]:min-w-1.5 [&_slider]:rounded-full [&_slider]:bg-white [&_slider]:shadow-lg",
        "[&_slider:hover]:min-h-2 [&_slider:hover]:min-w-2 active:[&_slider]:min-h-2 active:[&_slider]:min-w-2",
      )}
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
