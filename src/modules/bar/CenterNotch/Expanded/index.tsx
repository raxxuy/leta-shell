import { Orientation } from "@/enums";
import useCenterNotchMode from "@/hooks/features/center-notch/useCenterNotchMode";
import useSpacing from "@/hooks/services/useSpacing";
import MediaPlayer from "./MediaPlayer";

export default function Expanded() {
  const spacing = useSpacing();
  const { mode } = useCenterNotchMode();

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
      <box visible={mode((m) => m === "media")}>
        <MediaPlayer />
      </box>
      <box visible={mode((m) => m === "weather")}>
        <box>test</box>
      </box>
    </box>
  );
}
