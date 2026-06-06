import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import useAppQuery from "@/hooks/system/useAppQuery";

export const useCoverArt = (player: AstalMpris.Player) => {
  const { iconName } = useAppQuery(player.entry)[0];
  const coverArt = createBinding(player, "coverArt");

  return { iconName, coverArt };
};
