import AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";

const playbackIcons: Record<AstalMpris.PlaybackStatus, string> = {
  [AstalMpris.PlaybackStatus.PLAYING]: "pause-circle",
  [AstalMpris.PlaybackStatus.PAUSED]: "play",
  [AstalMpris.PlaybackStatus.STOPPED]: "stop",
};

export const usePlayback = (player: AstalMpris.Player) => {
  const length = createBinding(player, "length")(Math.floor);
  const position = createBinding(player, "position")(Math.floor);
  const playbackStatus = createBinding(player, "playbackStatus");
  const playbackIcon = playbackStatus((status) => playbackIcons[status]);
  return { length, position, playbackIcon };
};
