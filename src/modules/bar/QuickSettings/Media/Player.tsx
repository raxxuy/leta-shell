import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import ImageWrapper from "@/components/ImageWrapper";
import { Orientation, Overflow } from "@/enums";
import PlayerControls from "./PlayerControls";

interface PlayerProps {
  player: AstalMpris.Player;
}

export default function Player({ player }: PlayerProps) {
  const artUrl = createBinding(player, "artUrl");

  return (
    <box
      class="rounded-xl font-semibold"
      orientation={Orientation.VERTICAL}
      overflow={Overflow.HIDDEN}
    >
      <overlay>
        <ImageWrapper class="h-40 w-80 brightness-70" src={artUrl} />
        <PlayerControls player={player} />
      </overlay>
    </box>
  );
}
