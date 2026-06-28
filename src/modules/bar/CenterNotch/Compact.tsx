import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import type { CenterNotchMode } from "@/lib/config/schemas/bar/modules/center-notch";
import { MprisProvider } from "@/providers/MprisProvider";
import MediaCompact from "./MediaPlayer/Compact";

const compactMap = {
  media: () => <MprisProvider>{() => <MediaCompact />}</MprisProvider>,
  weather: () => <></>,
} satisfies Record<CenterNotchMode, () => JSX.Element>;

export default function Compact() {
  const { modes, mode } = useCenterNotch();

  return (
    <box class="min-w-56" hexpand={false}>
      {modes.map((m) => {
        const Module = compactMap[m];

        return (
          <box visible={mode(mode => mode === m)}>
            <Module />
          </box>
        );
      })}
    </box>
  );
}
