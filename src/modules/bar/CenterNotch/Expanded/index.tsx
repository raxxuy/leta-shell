import { Orientation } from "@/enums";
import { useCenterNotch } from "@/hooks/features/center-notch/useCenterNotch";
import { useSpacing } from "@/hooks/services/useSpacing";
import { MprisProvider } from "@/providers/MprisProvider";
import MediaPlayer from "./MediaPlayer";

export default function Expanded() {
  const spacing = useSpacing();
  const { mode } = useCenterNotch();

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
      <box visible={mode.is("media")}>
        <MprisProvider>{() => <MediaPlayer />}</MprisProvider>
      </box>
      <box visible={mode.is("weather")}>
        <box>test</box>
      </box>
    </box>
  );
}
