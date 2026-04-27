import AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import { formatDuration } from "@/lib/time";

const playbackIcons: Record<AstalMpris.PlaybackStatus, string> = {
  [AstalMpris.PlaybackStatus.PLAYING]: "pause-circle",
  [AstalMpris.PlaybackStatus.PAUSED]: "play",
  [AstalMpris.PlaybackStatus.STOPPED]: "stop",
};

export default function usePlayback(player: AstalMpris.Player) {
  const rawLength = createBinding(player, "length");
  const rawPosition = createBinding(player, "position");
  const playbackStatus = createBinding(player, "playbackStatus");

  const length = rawLength(Math.floor);
  const position = rawPosition(Math.floor);
  const playbackIcon = playbackStatus((status) => playbackIcons[status]);
  const formattedLength = rawLength((l) => formatDuration(Math.floor(l)));
  const formattedPosition = rawPosition((p) => formatDuration(Math.floor(p)));

  return { length, position, playbackIcon, formattedLength, formattedPosition };
}
