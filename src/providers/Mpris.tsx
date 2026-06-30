import { MprisContext, type MprisShape } from "@/contexts/Mpris";
import { useMprisService } from "@/hooks/services/useMprisService";

interface MprisProviderProps {
  children: () => JSX.Element;
}

export const MprisProvider = ({ children }: MprisProviderProps) => {
  const { active, players, queue, next, previous } = useMprisService();

  const hasPlayer = active((ap) => ap !== undefined);

  const value: MprisShape = {
    activePlayer: active,
    hasPlayer: hasPlayer,
    next: next,
    players: players,
    previous: previous,
    queue: queue,
  };

  return <MprisContext value={value}>{children}</MprisContext>;
};
