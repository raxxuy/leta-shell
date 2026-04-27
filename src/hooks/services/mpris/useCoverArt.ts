import type AstalMpris from "gi://AstalMpris";
import { createBinding, createMemo } from "ags";

export default function useCoverArt(player: AstalMpris.Player) {
  const artUrl = createBinding(player, "artUrl");
  
  // When listening to albums on soundcloud, artUrl will be the first played song, then it switches to coverArt
  const artSrc = createMemo(() => artUrl() || player.coverArt);
  const isFile = artUrl((url) => !url);

  return { artSrc, isFile };
}
