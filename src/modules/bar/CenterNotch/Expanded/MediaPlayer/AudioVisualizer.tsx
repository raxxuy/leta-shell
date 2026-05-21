import { With } from "ags";
import { Align, Orientation } from "@/enums";
import useAudioVisualizer from "@/hooks/features/center-notch/media/useAudioVisualizer";
import useSpacing from "@/hooks/services/useSpacing";
import { cleanupWidget, scan } from "@/lib/theme";

export default function AudioVisualizer() {
  const spacing = useSpacing();
  const { count, values } = useAudioVisualizer();

  return (
    <box $={scan} class="m-1" halign={Align.END} hexpand spacing={spacing.xs}>
      <With cleanup={cleanupWidget} value={count}>
        {(c) => (
          <box
            $={scan}
            class="m-1"
            halign={Align.END}
            hexpand
            spacing={spacing.xs}
          >
            {Array.from({ length: c }, (_, i) => (
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
        )}
      </With>
    </box>
  );
}
