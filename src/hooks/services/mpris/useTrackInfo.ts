import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";

export default function useTrackInfo(player: AstalMpris.Player) {
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");

  return { title, artist };
}
