import { MprisContext } from "@/contexts/Mpris";
import { useScrollLock } from "@/hooks/interactions/useScrollLock";

export const useMediaPreview = () => {
  const { activePlayer, players, next, previous } = MprisContext.use();
  const handleScroll = useScrollLock(200);

  const onScroll = (_: unknown, __: unknown, dy: number) => {
    if (players.peek().length < 2) return;
    handleScroll(dy, (dir) => {
      if (dir > 0) next();
      else previous();
    });
  };

  return { activePlayer, onScroll };
};
