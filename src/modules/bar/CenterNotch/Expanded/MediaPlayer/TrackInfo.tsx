import { With } from "ags";
import { Orientation } from "@/enums";
import useActivePlayer from "@/hooks/services/mpris/useActivePlayer";
import useTrackInfo from "@/hooks/services/mpris/useTrackInfo";
import { scan } from "@/lib/theme";

export default function TrackInfo() {
  const activePlayer = useActivePlayer();

  return (
    <box>
      <With value={activePlayer}>
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
