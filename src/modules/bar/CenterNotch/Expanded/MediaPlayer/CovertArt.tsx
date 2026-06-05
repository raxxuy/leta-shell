import { createBinding, With } from "ags";
import Image from "@/components/ui/Image";
import { Align, Overflow } from "@/enums";
import useMpris from "@/hooks/services/useMpris";
import usePixelSize from "@/hooks/services/usePixelSize";
import useAppQuery from "@/hooks/system/useAppQuery";
import { cleanupWidget, scan } from "@/lib/theme";

export default function CovertArt() {
  const pixelSize = usePixelSize();
  const { activePlayer } = useMpris();

  return (
    <With cleanup={cleanupWidget} value={activePlayer}>
      {(player) => {
        if (!player) return null;

        const [app] = useAppQuery(player.entry);
        const coverArt = createBinding(player, "coverArt");

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
              class="inset-shadow-sm -mr-1 -mb-1"
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
