import useMpris from "@/hooks/services/useMpris";
import useScrollLock from "@/hooks/ui/interactions/useScrollLock";
import MprisService from "@/services/mpris";

export default function useMediaPreview() {
  const service = MprisService.get_default();
  const handleScroll = useScrollLock(200);
  const { activePlayer } = useMpris();

  const onScroll = (_: unknown, __: unknown, dy: number) => {
    if (service.players.length < 2) return;
    handleScroll(dy, (dir) => {
      if (dir > 0) service.next();
      else service.previous();
    });
  };

  return { activePlayer, onScroll };
}
