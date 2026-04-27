import type AstalMpris from "gi://AstalMpris";
import { createComputed } from "ags";
import useActivePlayer from "@/hooks/services/mpris/useActivePlayer";
import useScrollLock from "@/hooks/ui/interactions/useScrollLock";
import MprisService from "@/services/mpris";
import useTrackInfo from "./useTrackInfo";

export const usePreviewLabel = (player: AstalMpris.Player) => {
  const { title, artist } = useTrackInfo(player);
  return createComputed(() => `${title()} - ${artist()}`);
};

export default function useMediaPreview() {
  const service = MprisService.get_default();
  const activePlayer = useActivePlayer();
  const handleScroll = useScrollLock(200);

  const onScroll = (_: unknown, __: unknown, dy: number) => {
    if (service.players.length < 2) return;
    handleScroll(dy, (dir) => {
      if (dir > 0) service.next();
      else service.previous();
    });
  };

  return { activePlayer, onScroll };
}
