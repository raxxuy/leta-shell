import type AstalMpris from "gi://AstalMpris";
import Image from "@/components/Image";
import { Align, Overflow } from "@/enums";
import { useCoverArt } from "@/hooks/features/media/useCoverArt";
import { usePixelSize } from "@/hooks/services/usePixelSize";

interface CovertArtProps {
  player: AstalMpris.Player;
}

export default function CovertArt({ player }: CovertArtProps) {
  const pixelSize = usePixelSize();
  const { iconName, coverArt } = useCoverArt(player);

  return (
    <overlay class="m-1 shadow-lg">
      <Image
        class="min-h-26 min-w-26 rounded-lg"
        file
        overflow={Overflow.HIDDEN}
        src={coverArt}
      />
      <image
        $type="overlay"
        class="inset-shadow-sm -mr-1 -mb-1 drop-shadow-black/50 drop-shadow-md"
        halign={Align.END}
        iconName={iconName}
        pixelSize={pixelSize.md}
        valign={Align.END}
      />
    </overlay>
  );
}
