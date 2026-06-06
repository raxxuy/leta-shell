import type AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed } from "ags";

export const useTrackInfo = (player: AstalMpris.Player) => {
  const title = createBinding(player, "title");
  const artist = createBinding(player, "artist");
  const previewLabel = createComputed(() => `${title()} - ${artist()}`);

  return { title, artist, previewLabel };
};
