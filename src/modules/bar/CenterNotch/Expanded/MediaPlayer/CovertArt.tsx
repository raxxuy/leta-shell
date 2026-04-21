import { createBinding, With } from "ags";
import Image from "@/components/ui/Image";
import { Align, Overflow } from "@/enums";
import { useActivePlayer } from "@/hooks/useActivePlayer";
import { useAppQuery } from "@/hooks/useAppQuery";
import { usePixelSize } from "@/hooks/usePixelSize";

export default function CovertArt() {
  const pixelSize = usePixelSize();
  const activePlayer = useActivePlayer();

  return (
    <With value={activePlayer}>
      {(player) => {
        if (!player) return null;

        const [app] = useAppQuery(player.entry);

        const artUrl = createBinding(player, "artUrl");

        return (
          <overlay class="m-1 shadow-lg">
            <Image
              class="min-h-24 min-w-24 rounded-lg"
              overflow={Overflow.HIDDEN}
              src={artUrl}
            />
            <image
              $type="overlay"
              class="-mr-1 -mb-1 shadow-xl"
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
