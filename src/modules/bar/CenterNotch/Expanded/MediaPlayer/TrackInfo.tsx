import { With } from "ags";
import { Orientation } from "@/enums";
import useTrackInfo from "@/hooks/features/center-notch/media/useTrackInfo";
import useMpris from "@/hooks/services/useMpris";
import { cleanupWidget, scan } from "@/lib/theme";

export default function TrackInfo() {
  const { activePlayer } = useMpris();

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
