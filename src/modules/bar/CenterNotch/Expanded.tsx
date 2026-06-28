import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import type { CenterNotchMode } from "@/lib/config/schemas/bar/modules/center-notch";
import { MprisProvider } from "@/providers/MprisProvider";
import MediaExpanded from "./MediaPlayer/Expanded";

const expandedMap = {
  media: () => <MprisProvider>{() => <MediaExpanded />}</MprisProvider>,
  weather: () => <></>,
} satisfies Record<CenterNotchMode, () => JSX.Element>;

export default function Expanded() {
  const { modes, mode } = useCenterNotch();

  return (
    <box>
      {modes.map((m) => {
        const Module = expandedMap[m];

        return (
          <box visible={mode((mode) => mode === m)}>
            <Module />
          </box>
        );
      })}
    </box>
  );
}
