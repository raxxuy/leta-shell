import type AstalMpris from "gi://AstalMpris";

import Image from "@/components/Image";
import { Overflow } from "@/enums";
import { createBindings } from "@/lib/binding";
import { scan } from "@/lib/theme/plugin";

interface CoverArtProps {
  player: AstalMpris.Player;
}

export default function CoverArt({ player }: CoverArtProps) {
  if (!player) return <box />;

  const { coverArt } = createBindings(player, {
    coverArt: true,
  });

  return (
    <overlay $={scan} class="m-1 shadow-md/20">
      <Image
        class="min-h-26 min-w-26 rounded-xl"
        file
        overflow={Overflow.HIDDEN}
        src={coverArt}
      />
    </overlay>
  );
}
