import AstalCava from "gi://AstalCava";
import AstalMpris from "gi://AstalMpris";

import { createBinding, createEffect, createState, onCleanup } from "ags";
import type { Timer } from "ags/time";
import { interval } from "ags/time";

import { Align, Orientation } from "@/enums";
import { scan } from "@/lib/theme/plugin";
import { useTheme } from "@/providers/ThemeProvider";

interface AudioVisualizerProps {
  player: AstalMpris.Player;
}

export default function AudioVisualizer({ player }: AudioVisualizerProps) {
  const { spacing } = useTheme();

  const cava = AstalCava.get_default();
  const count = 12;

  if (!cava) {
    return <box class="m-1" halign={Align.END} hexpand spacing={spacing.xs} />;
  }

  cava.set_bars(count);

  const [values, setValues] = createState<number[]>(Array(count).fill(0));

  createEffect(() => {
    const playing = player
      ? createBinding(player, "playbackStatus")() ===
        AstalMpris.PlaybackStatus.PLAYING
      : false;

    let decay: Timer | null = null;

    if (!playing) {
      cava.active = false;

      decay = interval(50, () => {
        setValues((prev) => {
          const next = prev.map((v) => (v <= 0.05 ? 0 : v * 0.6));
          if (next.every((v) => v === 0)) {
            if (decay) decay.cancel();
            decay = null;
          }
          return next;
        });
      });
    } else {
      cava.active = true;
    }

    onCleanup(() => {
      if (decay) {
        decay.cancel();
        decay = null;
      }
    });
  });

  const id = cava.connect("notify::values", () => {
    setValues(cava.values.slice(0, count));
  });

  onCleanup(() => cava.disconnect(id));

  return (
    <box $={scan} class="m-1" halign={Align.END} hexpand spacing={spacing.xs}>
      {Array.from({ length: count }, (_, i) => (
        <box
          class="min-w-1 rounded-full bg-white transition-all duration-100"
          heightRequest={values((v) =>
            Math.max(2, Math.round((v[i] ?? 0) * 48)),
          )}
          orientation={Orientation.VERTICAL}
          valign={Align.END}
        />
      ))}
    </box>
  );
}
