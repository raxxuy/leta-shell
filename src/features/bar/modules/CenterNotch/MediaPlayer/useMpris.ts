import type AstalMpris from "gi://AstalMpris";

import { createBindings } from "@/lib/binding";
import MprisService from "@/services/mpris";

export const useMpris = () => {
  const service = MprisService.get_default();

  const { active, queue, players } = createBindings(service, {
    active: true,
    queue: true,
    players: true,
  });

  const next = () => service.next();
  const previous = () => service.previous();
  const setActive = (player: AstalMpris.Player) => service.setActive(player);

  return {
    queue,
    players,
    active,
    next,
    previous,
    setActive,
  };
};
