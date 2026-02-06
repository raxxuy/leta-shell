import { With } from "ags";
import { useMedia } from "@/hooks/useMedia";
import Player from "./Player";

export default function Media() {
  const { currentPlayer } = useMedia();

  return (
    <With value={currentPlayer}>
      {(currentPlayer) =>
        currentPlayer ? <Player player={currentPlayer} /> : null
      }
    </With>
  );
}
