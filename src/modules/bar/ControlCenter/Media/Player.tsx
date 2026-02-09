import type AstalMpris from "gi://AstalMpris";
import { createBinding } from "ags";
import ImageWrapper from "@/components/ImageWrapper";
import { Align, Orientation, Overflow } from "@/enums";
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
        <ImageWrapper class="h-42 w-80 brightness-60" src={artUrl} />
        <overlay $type="overlay" overflow={Overflow.HIDDEN} valign={Align.END}>
          <ImageWrapper class="h-32 w-80 blur-xs" src={artUrl} />
          <PlayerControls player={player} />
        </overlay>
      </overlay>
    </box>
  );
}
