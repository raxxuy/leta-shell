import { createBinding } from "ags";
import { MediaService } from "@/services/media";

export const useMedia = () => {
  const mediaService = MediaService.get_default();

  return {
    nextPlayer: () => mediaService.nextPlayer(),
    previousPlayer: () => mediaService.previousPlayer(),
    players: createBinding(mediaService, "players"),
    currentPlayer: createBinding(mediaService, "currentPlayer"),
  };
};
