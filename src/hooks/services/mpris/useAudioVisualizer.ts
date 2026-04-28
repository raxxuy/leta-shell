import AstalCava from "gi://AstalCava";
import AstalMpris from "gi://AstalMpris";
import { createBinding, createEffect, createState, onCleanup } from "ags";
import useConfig from "@/hooks/services/config/useConfig";
import useActivePlayer from "@/hooks/services/mpris/useActivePlayer";

export default function useAudioVisualizer() {
  const [count] = useConfig(
    "bar",
    "settings.centerNotch.media.visualizer.count",
  );

  const cava = AstalCava.get_default();
  if (!cava) return createState<number[]>([])[0];

  const activePlayer = useActivePlayer();

  createEffect(() => {
    cava.set_bars(count());
  });

  const [values, setValues] = createState<number[]>(
    Array(count.peek()).fill(0),
  );

  let decay: ReturnType<typeof setInterval> | null = null;

  createEffect(() => {
    const player = activePlayer();
    const playing =
      player &&
      createBinding(player, "playbackStatus")() ===
        AstalMpris.PlaybackStatus.PLAYING;

    if (!playing) {
      cava.active = false;

      if (decay) return;

      decay = setInterval(() => {
        setValues((prev) => {
          const next = prev.map((v) => (v <= 0.05 ? 0 : v * 0.6));
          if (next.every((v) => v === 0)) {
            if (decay) clearInterval(decay);
            decay = null;
          }
          return next;
        });
      }, 50);
    } else {
      cava.active = true;

      if (decay) {
        clearInterval(decay);
        decay = null;
      }
    }
  });

  const id = cava.connect("notify::values", () => {
    setValues(cava.values.slice(0, count.peek()));
  });

  onCleanup(() => cava.disconnect(id));

  return values;
}
