import AstalMpris from "gi://AstalMpris";
import { createBinding, createState, With } from "ags";
import Player from "@/modules/bar/QuickSettings/Media/Player";

export default function Media() {
  const mpris = AstalMpris.get_default();
  const players = createBinding(mpris, "players");

  const [current, _setCurrent] = createState<number>(0);

  return (
    <box>
      <With value={current}>
        {(current) => {
          const player = players()[current];

          if (!player) return null;

          return <Player player={player} />;
        }}
      </With>
    </box>
  );
}
