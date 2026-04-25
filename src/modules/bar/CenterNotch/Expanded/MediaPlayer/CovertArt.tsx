import { createBinding, createMemo, With } from "ags";
import Image from "@/components/ui/Image";
import { Align, Overflow } from "@/enums";
import { useAppQuery } from "@/hooks/astal/useAppQuery";
import { usePixelSize } from "@/hooks/services/config/usePixelSize";
import { useActivePlayer } from "@/hooks/services/mpris/useActivePlayer";

export default function CovertArt() {
  const pixelSize = usePixelSize();
  const activePlayer = useActivePlayer();

  return (
    <With value={activePlayer}>
      {(player) => {
        if (!player) return null;

        const [app] = useAppQuery(player.entry);

        const artUrl = createBinding(player, "artUrl");

        // When listening to albums on soundcloud, artUrl will be the first played song, then it switches to coverArt
        const artSrc = createMemo(() => artUrl() || player.coverArt);
        const isFile = artUrl((url) => !url);

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
