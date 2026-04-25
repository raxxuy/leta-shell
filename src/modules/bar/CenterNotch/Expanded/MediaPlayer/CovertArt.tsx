import { createBinding, With } from "ags";
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

        return (
          <overlay class="m-1 shadow-lg">
            <Image
              class="min-h-26 min-w-26 rounded-lg"
              overflow={Overflow.HIDDEN}
              src={artUrl}
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
