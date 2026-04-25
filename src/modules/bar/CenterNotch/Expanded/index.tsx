import { With } from "ags";
import { Orientation } from "@/enums";
import { useCenterNotchMode } from "@/hooks/services/config/useCenterNotchMode";
import { useSpacing } from "@/hooks/services/config/useSpacing";
import MediaPlayer from "./MediaPlayer";

const components = {
  media: () => <MediaPlayer />,
  weather: () => <box>test</box>,
};

export default function Expanded() {
  const spacing = useSpacing();

  const { mode } = useCenterNotchMode();

  return (
    <box orientation={Orientation.VERTICAL} spacing={spacing.md}>
      <With value={mode}>{(m) => components[m]()}</With>
    </box>
  );
}
