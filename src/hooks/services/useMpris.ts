import { createBinding } from "ags";
import MprisService from "@/services/mpris";

export default function useMpris() {
  const service = MprisService.get_default();

  const queue = createBinding(service, "queue");
  const players = createBinding(service, "players");
  const activePlayer = createBinding(service, "active");

  return {
    queue,
    players,
    activePlayer,
  };
}
