import AstalMpris from "gi://AstalMpris";

import Svg from "@/components/Svg";
import { Cursors } from "@/constants";
import { Align, Orientation } from "@/enums";
import { useSliderDrag } from "@/hooks/interactions/useSliderDrag";
import { createBindings } from "@/lib/binding";
import { scan } from "@/lib/theme/plugin";
import { formatDuration } from "@/lib/time";
import { useTheme } from "@/providers/ThemeProvider";
import type { Reactive } from "@/types/reactive";

interface TrackProps {
  player: AstalMpris.Player;
}

interface MediaButtonProps {
  iconName: Reactive<string>;
  onClick: () => void;
  pixelSize: Reactive<number>;
}

const TrackInfo = ({ player }: TrackProps) => {
  const { title, artist } = createBindings(player, {
    title: true,
    artist: true,
  });

  return (
    <box class="text-shadow-xs" hexpand orientation={Orientation.VERTICAL}>
      <label class="font-bold text-lg" label={title} />
      <label class="font-semibold text-sm" label={artist} />
    </box>
  );
};

const PlaybackTime = ({ player }: TrackProps) => {
  const { position, length } = createBindings(player, {
    position: true,
    length: true,
  });

  const formattedLength = length((l) => formatDuration(Math.floor(l)));
  const formattedPosition = position((p) => formatDuration(Math.floor(p)));

  return (
    <box class="font-medium text-shadow-xs text-sm" hexpand>
      <label label={formattedPosition} xalign={0} />
      <box hexpand />
      <label label={formattedLength} xalign={1} />
    </box>
  );
};

const PlaybackSlider = ({ player }: TrackProps) => {
  const { position, length } = createBindings(player, {
    position: true,
    length: true,
  });

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
      onNotify={(_, pspec) => {
        if (pspec.name === "css-classes") handleDrag();
      }}
      orientation={Orientation.HORIZONTAL}
      value={display}
    />
  );
};

const MediaButton = ({ iconName, onClick, pixelSize }: MediaButtonProps) => (
  <button
    class="transition-transform hover:scale-110"
    cursor={Cursors.POINTER}
    focusable={false}
    onClicked={onClick}
  >
    <Svg
      class="text-white drop-shadow-sm/20"
      iconName={iconName}
      pixelSize={pixelSize}
    />
  </button>
);

const PlaybackButtons = ({ player }: TrackProps) => {
  const { spacing } = useTheme();

  const playbackIcons: Record<AstalMpris.PlaybackStatus, string> = {
    [AstalMpris.PlaybackStatus.PAUSED]: "play",
    [AstalMpris.PlaybackStatus.PLAYING]: "pause",
    [AstalMpris.PlaybackStatus.STOPPED]: "stop",
  };

  const size = spacing.scale("lg", 1.25);

  const { playbackStatus } = createBindings(player, {
    playbackStatus: true,
  });

  const playbackIcon = playbackStatus((ps) => playbackIcons[ps]);

  return (
    <box class="-mt-5.5" halign={Align.CENTER} hexpand spacing={spacing.md}>
      <MediaButton
        iconName="skip-back"
        onClick={() => player.previous()}
        pixelSize={size}
      />
      <MediaButton
        iconName={playbackIcon}
        onClick={() => player.play_pause()}
        pixelSize={size}
      />
      <MediaButton
        iconName="skip-forward"
        onClick={() => player.next()}
        pixelSize={size}
      />
    </box>
  );
};

export default function Track({ player }: TrackProps) {
  const { spacing } = useTheme();

  if (!player) return <box />;

  return (
    <box $={scan} orientation={Orientation.VERTICAL} spacing={spacing.lg}>
      <TrackInfo player={player} />

      <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
        <PlaybackSlider player={player} />
        <PlaybackTime player={player} />
        <PlaybackButtons player={player} />
      </box>
    </box>
  );
}
