import { createBinding, With } from "ags";
import { Orientation } from "@/enums";
import { useActivePlayer } from "@/hooks/services/mpris/useActivePlayer";

export default function TrackInfo() {
  const activePlayer = useActivePlayer();

  return (
    <box>
      <With value={activePlayer}>
        {(player) => {
          if (!player) return null;

          const title = createBinding(player, "title");
          const artist = createBinding(player, "artist");

          return (
            <box hexpand orientation={Orientation.VERTICAL}>
              <label class="font-bold text-lg" label={title} />
              <label class="font-semibold text-sm" label={artist} />
            </box>
          );
        }}
      </With>
    </box>
  );
}
