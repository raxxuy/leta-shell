import AstalMpris from "gi://AstalMpris";
import { createBinding, createState, With } from "ags";
import Player from "@/modules/bar/QuickSettings/Media/Player";

export default function Media() {
  const [current, _setCurrent] = createState<number>(0);
  const mpris = AstalMpris.get_default();
  const players = createBinding(mpris, "players");

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
