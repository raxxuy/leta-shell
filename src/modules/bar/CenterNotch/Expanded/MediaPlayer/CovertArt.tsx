import { With } from "ags";
import Image from "@/components/ui/Image";
import { Align, Overflow } from "@/enums";
import usePixelSize from "@/hooks/services/config/usePixelSize";
import useActivePlayer from "@/hooks/services/mpris/useActivePlayer";
import useCoverArt from "@/hooks/services/mpris/useCoverArt";
import useAppQuery from "@/hooks/system/useAppQuery";

export default function CovertArt() {
  const pixelSize = usePixelSize();
  const activePlayer = useActivePlayer();

  return (
    <With value={activePlayer}>
      {(player) => {
        if (!player) return null;

        const [app] = useAppQuery(player.entry);
        const { artSrc, isFile } = useCoverArt(player);

        return (
          <overlay class="m-1 shadow-lg">
            <Image
              class="min-h-26 min-w-26 rounded-lg"
              file={isFile}
              overflow={Overflow.HIDDEN}
              src={artSrc}
            />
            <image
              $type="overlay"
              class="-mr-1 -mb-1 shadow-md"
              halign={Align.END}
              iconName={app.iconName}
              pixelSize={pixelSize.md}
              valign={Align.END}
            />
          </overlay>
        );
      }}
    </With>
  );
}
