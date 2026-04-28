import { createBinding } from "ags";
import MprisService from "@/services/mpris";

export default function useActivePlayer() {
  const service = MprisService.get_default();

  const player = createBinding(service, "active");

  return player;
}
