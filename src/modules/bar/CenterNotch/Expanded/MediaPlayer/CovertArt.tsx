import { With } from "ags";
import Image from "@/components/Image";
import { MprisContext } from "@/contexts/MprisContext";
import { Align, Overflow } from "@/enums";
import { useCoverArt } from "@/hooks/features/media/useCoverArt";
import { usePixelSize } from "@/hooks/services/usePixelSize";
import { cleanupWidget, scan } from "@/lib/theme";

export default function CovertArt() {
  const pixelSize = usePixelSize();
  const { activePlayer } = MprisContext.use();

  return (
    <With cleanup={cleanupWidget} value={activePlayer}>
      {(player) => {
        if (!player) return null;

        const { iconName, coverArt } = useCoverArt(player);

        return (
          <overlay $={scan} class="m-1 shadow-lg">
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
      }}
    </With>
  );
}
