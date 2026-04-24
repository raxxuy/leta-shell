import AstalCava from "gi://AstalCava";
import AstalMpris from "gi://AstalMpris";
import { createBinding, createEffect, createState, onCleanup, With } from "ags";
import { Align, Orientation } from "@/enums";
import { useConfig } from "@/hooks/services/config/useConfig";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import { useActivePlayer } from "@/hooks/services/mpris/useActivePlayer";

export default function AudioVisualizer() {
  const spacing = useSpacing();
  const activePlayer = useActivePlayer();
  const [barCount] = useConfig(
    "bar",
    "settings.centerNotch.media.visualizer.count",
  );

  const cava = AstalCava.get_default() as AstalCava.Cava;
  cava.set_bars(barCount.peek());

  const [values, setValues] = createState<number[]>(
    Array(barCount.peek()).fill(0),
  );

  createEffect(() => {
    const player = activePlayer();
    const status = () => createBinding(player, "playbackStatus")();
    const playing = player && status() === AstalMpris.PlaybackStatus.PLAYING;

    if (!playing) {
      cava.active = false;

      const decay = setInterval(() => {
        setValues((prev) => {
          const next = prev.map((v) => (v <= 0.05 ? 0 : v * 0.6));
          if (next.every((v) => v === 0)) clearInterval(decay);
          return next;
        });
      }, 50);
    } else {
      cava.active = true;
    }
  });

  const handler = () => {
    const next = cava.get_values().slice(0, barCount.peek());
    setValues(next);
  };

  const id = cava.connect("notify::values", handler);
  onCleanup(() => cava.disconnect(id));

  return (
    <With value={values}>
      {(values) => (
        <box class="m-1" halign={Align.END} hexpand spacing={spacing.xs}>
          {values.map((v) => (
            <box
              class="min-w-1 rounded-full bg-white transition-all duration-100"
              heightRequest={Math.max(2, Math.round(v * 48))}
              orientation={Orientation.VERTICAL}
              valign={Align.END}
            />
          ))}
        </box>
      )}
    </With>
  );
}
