import { With } from "ags";
import { MprisContext } from "@/contexts/MprisContext";
import { Orientation } from "@/enums";
import { useTrackInfo } from "@/hooks/features/media/useTrackInfo";
import { cleanupWidget, scan } from "@/lib/theme";

export default function TrackInfo() {
  const { activePlayer } = MprisContext.use();

  return (
    <box>
      <With cleanup={cleanupWidget} value={activePlayer}>
        {(player) => {
          if (!player) return null;

          const { title, artist } = useTrackInfo(player);

          return (
            <box $={scan} hexpand orientation={Orientation.VERTICAL}>
              <label class="font-bold text-lg" label={title} />
              <label class="font-semibold text-sm" label={artist} />
            </box>
          );
        }}
      </With>
    </box>
  );
}
