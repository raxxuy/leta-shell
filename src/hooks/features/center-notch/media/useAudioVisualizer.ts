import AstalCava from "gi://AstalCava";
import AstalMpris from "gi://AstalMpris";
import { createBinding, createEffect, createState, onCleanup } from "ags";
import { BarConfigContext } from "@/contexts/BarConfigContext";
import useMpris from "@/hooks/services/useMpris";

export default function useAudioVisualizer() {
  const {
    visualizerCount: [count],
  } = BarConfigContext.use();

  const cava = AstalCava.get_default();
  if (!cava)
    return {
      count,
      values: createState<number[]>([])[0],
    };

  const { activePlayer } = useMpris();

  createEffect(() => {
    cava.set_bars(count());
  });

  const [values, setValues] = createState<number[]>(
    Array(count.peek()).fill(0),
  );

  createEffect(() => {
    const player = activePlayer();
    const playing =
      player &&
      createBinding(player, "playbackStatus")() ===
        AstalMpris.PlaybackStatus.PLAYING;

    let decay: ReturnType<typeof setInterval> | null = null;

    if (!playing) {
      cava.active = false;

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
    }

    onCleanup(() => {
      if (decay) {
        clearInterval(decay);
        decay = null;
      }
    });
  });

  const id = cava.connect("notify::values", () => {
    setValues(cava.values.slice(0, count.peek()));
  });

  onCleanup(() => cava.disconnect(id));

  return { count, values };
}
