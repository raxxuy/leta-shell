import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import MprisService from "@/services/mpris";

export const useMprisService = () => {
  const service = MprisService.get_default();

  const active = createBinding(service, "active");
  const queue = createBinding(service, "queue");
  const players = createBinding(service, "players");

  const next = service.next;
  const previous = service.previous;
  const setActive = (activePlayer: AstalMpris.Player) =>
    service.setActive(activePlayer);

  return {
    queue,
    players,
    active,
    next,
    previous,
    setActive,
  };
};
