import { With } from "ags";
import { Align, Orientation } from "@/enums";
import useSpacing from "@/hooks/core/useSpacing";
import useAudioVisualizer from "@/hooks/features/center-notch/media/useAudioVisualizer";
import { scan } from "@/lib/theme";

export default function AudioVisualizer() {
  const spacing = useSpacing();
  const values = useAudioVisualizer();

  return (
    <With value={values}>
      {(values) => (
        <box
          $={scan}
          class="m-1"
          halign={Align.END}
          hexpand
          spacing={spacing.xs}
        >
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
